import { config } from "dotenv";
import twilio from "twilio";

// Load environment variables from .env file
config();

// Destructure environment variables for Twilio credentials
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

// Create a Twilio client using Account SID and Auth Token
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Async function to send SMS
const sendSms = async (to, message) => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER, // Your Twilio number
      to, // Recipient's phone number
    });
    console.log(`Message sent: ${msg.sid}`);
    return msg.sid;
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    throw error;
  }
};

export { sendSms };
