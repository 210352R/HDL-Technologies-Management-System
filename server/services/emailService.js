import Mailgen from "mailgen";
import nodemailer from "nodemailer";

import dotenv from "dotenv"; // Use import in modern JS
dotenv.config(); // Load environment variables.

const { GMAIL_USER, GMAIL_PASS } = process.env;

// Function to send emails to the user

export const sendEmailNotification = (bill) => {
  const {
    first_name,
    bill_id,
    laptop_id,
    laptop_model,
    laptop_brand,
    announce_date,
    handover_date,
    issue_description,
    price,
    qr_code,
    email,
  } = bill;

  let config = {
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Tech Repair Center",
      link: "https://yourapp.com/",
    },
  });

  let response = {
    body: {
      name: first_name + " ",
      intro:
        "We're excited to inform you about the details of the newly added bill for your repair service at Tech Repair Center.",
      table: {
        data: [
          {
            item: "Bill ID",
            description: bill_id, // Add your bill ID variable here
          },
          {
            item: "Laptop ID",
            description: laptop_id, // Add your laptop ID variable here
          },
          {
            item: "Laptop Model",
            description: laptop_model, // Add your laptop model variable here
          },
          {
            item: "Laptop Brand",
            description: laptop_brand, // Add your laptop model variable here
          },
          {
            item: "Announce Date",
            description: announce_date, // Add the announce date variable here
          },
          {
            item: "Handover Date",
            description: handover_date, // Add the handover date variable here
          },
          {
            item: "Issue",
            description: issue_description, // Add the issue description variable here
          },
          {
            item: "Price",
            description: price + " LKR", // Add the price variable here
          },
        ],
        columns: {
          // Configure the table to display in two columns (key-value)
          customWidth: {
            item: "20%",
            description: "80%",
          },
          customAlignment: {
            item: "left",
            description: "right",
          },
        },
      },
      action: {
        instructions:
          "You can view the details or track your repair by clicking the button below:",
        button: {
          color: "#123D83FF", // Optional button color
          text: "View Repair Details",
          link: "http://yourapp.com/repair-details/" + bill_id, // Link to view the repair details page
        },
      },
      // Adding a QR code as an image in the email
      outro: `
        <p>Please find below the QR code to track the status of your repair:</p>
        <img src= ${qr_code} alt="QR Code" style="width: 150px; height: 150px;"/>
      `,
    },
  };

  // Generate and return the email content
  let emailBody = MailGenerator.generate(response);

  let message = {
    from: "bwanuththara@gmail.com",
    to: email,
    subject: "Place Order",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("email sent successfully !  -> ", first_name);
    })
    .catch((error) => {
      console.log("Error : ", error);
      throw error;
    });

  // res.status(201).json("getBill Successfully...!");
};
