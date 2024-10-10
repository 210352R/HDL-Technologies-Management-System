import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url"; // Add this

const execAsync = promisify(exec);

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Add this
const __dirname = path.dirname(__filename); // Add this

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Load from environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to delete all files in the local backups folder
const clearLocalBackups = (backupDir) => {
  try {
    if (fs.existsSync(backupDir)) {
      fs.readdirSync(backupDir).forEach((file) => {
        const filePath = path.join(backupDir, file);
        fs.unlinkSync(filePath); // Delete the file
        console.log(`Deleted local backup file: ${filePath}`);
      });
    }
  } catch (err) {
    console.error(`Failed to clear local backups: ${err.message}`);
  }
};

// Function to clear all backup files in the S3 bucket
const clearS3Backups = async (bucketName) => {
  try {
    const listedObjects = await s3
      .listObjectsV2({ Bucket: bucketName })
      .promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
    });

    const deleteResult = await s3.deleteObjects(deleteParams).promise();
    console.log(`Deleted ${deleteResult.Deleted.length} files from S3.`);
  } catch (err) {
    console.error(`Failed to clear S3 backups: ${err.message}`);
  }
};

// Function to upload the backup file to S3
const uploadToS3 = async (filePath, fileName) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: "hdl-mongo-backup", // Replace with your actual bucket name
      Key: fileName,
      Body: fileStream,
    };

    const data = await s3.upload(uploadParams).promise();
    console.log(`File uploaded to AWS S3 successfully: ${data.Location}`);
  } catch (err) {
    console.error(`Upload failed: ${err.message}`);
  }
};
// Function to download a dump file from S3
const downloadFromS3 = async (fileName, downloadPath) => {
  try {
    const params = {
      Bucket: "hdl-mongo-backup", // Replace with your actual bucket name
      Key: fileName,
    };

    const data = await s3.getObject(params).promise();
    fs.writeFileSync(downloadPath, data.Body);
    console.log(`Downloaded file from S3: ${downloadPath}`);
  } catch (err) {
    console.error(`Download failed: ${err.message}`);
  }
};

// Function to back up the MongoDB database
export const backupDatabase = async () => {
  const backupDir = path.join(__dirname, "backups");
  const timestamp = new Date().toISOString().split("T")[0];
  const backupFilePath = path.join(backupDir, `backup-${timestamp}.gz`);

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Step 1: Clear local backup folder
  clearLocalBackups(backupDir);

  // Step 2: Clear existing backups in the S3 bucket
  await clearS3Backups("hdl-mongo-backup");

  // Step 3: MongoDB URI (use environment variables for security)
  const mongoUri = process.env.DATABASE_URL;

  // Step 4: Command to back up the database
  const mongodumpCmd = `mongodump --uri="${mongoUri}" --archive="${backupFilePath}" --gzip`;

  // Execute the backup command
  const { stdout, stderr } = await execAsync(mongodumpCmd);
  if (stderr) {
    console.error(`Backup error: ${stderr}`);
  }
  // Step 5: Upload the new backup file to S3
  await uploadToS3(backupFilePath, `backup-${timestamp}.gz`);
};

// Function to restore the MongoDB database
const restoreDatabase = async (dumpFilePath) => {
  try {
    // MongoDB URI (use environment variables for security)
    const mongoUri = process.env.DATABASE_URL;

    // Command to restore the database
    const mongorestoreCmd = `mongorestore --uri="${mongoUri}" --archive="${dumpFilePath}" --gzip`;

    // Execute the restore command
    const { stdout, stderr } = await execAsync(mongorestoreCmd);
    if (stderr) {
      console.error(`Restore error: ${stderr}`);
    }
    console.log(`Restore successful: ${stdout}`);
  } catch (error) {
    console.error(`Restore failed: ${error.message}`);
  }
};

// Function to trigger a restore from S3
export const restoreFromS3 = async (fileName) => {
  try {
    const backupDir = path.join(__dirname, "downloads");
    const dumpFilePath = path.join(backupDir, fileName); // Path to save the downloaded file

    // Step 1: Download the dump file from S3
    await downloadFromS3(fileName, dumpFilePath);

    // Step 2: Restore the database from the downloaded file
    await restoreDatabase(dumpFilePath);
  } catch (error) {
    console.error(`Restore process failed: ${error.message}`);
  }
};

// Function to generate a pre-signed URL for downloading the file
const getPresignedUrl = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60 * 60, // URL valid for 1 hour
  };
  return s3.getSignedUrl("getObject", params); // Generate pre-signed URL
};

export const getFileDetails = async () => {
  const bucketName = "hdl-mongo-backup";
  const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();

  // Extract relevant file details and generate pre-signed URLs
  const fileDetails = data.Contents.map((file) => ({
    key: file.Key,
    size: file.Size,
    lastModified: file.LastModified,
    downloadUrl: getPresignedUrl(bucketName, file.Key), // Generate the pre-signed URL
  }));
  return fileDetails;
};
