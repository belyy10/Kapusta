const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { EMAIL_PASS, EMAIL_USER } = process.env;

// const sgMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "kasia-94@ukr.net" };

//   try {
//     await sgMail.send(email);
//     console.log("Email send");
//     return true;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
