const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { EMAIL_PASS, EMAIL_USER } = process.env;

async function sendEmail({ to, html, subject }) {
  try {
    const config = {
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
      from: "kasia-94@ukr.net",
      to,
      subject,
      html,
    };

    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.error("app error:", error);
  }
}

module.exports = sendEmail;
