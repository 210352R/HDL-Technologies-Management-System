import Mailgen from "mailgen";
import nodemailer from "nodemailer";

import dotenv from "dotenv"; // Use import in modern JS
dotenv.config(); // Load environment variables.

const { GMAIL_USER, GMAIL_PASS } = process.env;

// Function to send emails to the user

export const sendEmailsToUser = (teacher) => {
  //   const { userEmail } = req.body;
  const { first_name, last_name } = teacher;

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
            "Bill ID": bill_id, // Add your bill ID variable here
            "Laptop ID": laptop_id, // Add your laptop ID variable here
            "Laptop Model": laptop_model, // Add your laptop model variable here
            "Announce Date": announce_date, // Add the announce date variable here
            "Handover Date": handover_date, // Add the handover date variable here
            Issue: issue_description, // Add the issue description variable here
            Price: price + " LKR", // Add the price variable here
          },
        ],
      },
      // Adding a QR code as an image in the email
      outro: `
        <p>Please find below the QR code to track the status of your repair:</p>
        <img src="http://yourapp.com/qr-code/${qr_code}" alt="QR Code" style="width: 150px; height: 150px;"/>
      `,
      action: {
        instructions:
          "You can view the details or track your repair by clicking the button below:",
        button: {
          color: "#22BC66", // Optional button color
          text: "View Repair Details",
          link: "http://yourapp.com/repair-details/" + bill_id, // Link to view the repair details page
        },
      },
      outro:
        "Thank you for choosing Tech Repair Center. We look forward to serving you!",
    },
  };

  // Generate and return the email content
  let emailBody = MailGenerator.generate(response);

  let message = {
    from: "bwanuththara@gmail.com",
    to: "eshanmaduranga0329@gmail.com",
    subject: "Place Order",
    html: mail,
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
