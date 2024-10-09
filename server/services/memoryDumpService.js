import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Load from environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload the backup file to S3
const uploadToS3 = async (filePath, fileName) => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: "hdl-bucket-user ", // Replace with your actual bucket name
      Key: fileName,
      Body: fileStream,
    };

    const data = await s3.upload(uploadParams).promise();
    console.log(`File uploaded to aws s3 successfully: ${data.Location}`);
  } catch (err) {
    console.error(`Upload failed: ${err.message}`);
  }
};

// Function to back up the MongoDB database
export const backupDatabase = async () => {
  try {
    const backupDir = path.join(__dirname, "backups");
    const timestamp = new Date().toISOString().split("T")[0];
    const backupFilePath = path.join(backupDir, `backup-${timestamp}.gz`);

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // MongoDB URI (use environment variables for security)
    const mongoUri = process.env.DATABASE_URL;

    // Command to back up the database
    const mongodumpCmd = `mongodump --uri="${mongoUri}" --archive="${backupFilePath}" --gzip`;

    // Execute the backup command
    const { stdout, stderr } = await execAsync(mongodumpCmd);
    if (stderr) {
      console.error(`Backup error: ${stderr}`);
    }
    console.log(`Backup successful: ${stdout}`);

    // Upload the backup file to S3
    await uploadToS3(backupFilePath, `backup-${timestamp}.gz`);
  } catch (error) {
    console.error(`Backup failed: ${error.message}`);
  }
};

// // Trigger the backup process
// backupDatabase();
