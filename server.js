import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const router = express.Router();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use("/", router);

// Start the server
app.listen(5000, () => console.log("Server Running on port 5000"));

// Verify email user and password environment variables
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);

// Nodemailer setup for sending emails
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email user
    pass: process.env.EMAIL_PASS  // Use environment variable for email password
  },
});

// Verify the email transport connection
contactEmail.verify((error) => {
  if (error) {
    console.log("Error setting up the email service:", error);
  } else {
    console.log("Email service ready to send messages");
  }
});

// Route to handle form submissions
router.post("/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body; // Destructure the request body
  const fullName = `${firstName} ${lastName}`;

  const mailOptions = {
    from: fullName,
    to: process.env.EMAIL_USER, // The email that will receive form submissions
    subject: "Contact Form Submission - Portfolio",
    html: `
      <h3>Contact Form Details</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Send the email using the Nodemailer transport
  contactEmail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
    } else {
      console.log("Message sent:", info.response);
      res.status(200).json({ success: true, message: "Message sent successfully!" });
    }
  });
});
