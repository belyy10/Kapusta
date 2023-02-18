const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "kasia-94@ukr.net" };

  try {
    await sgMail.send(email);
    console.log("Email send");
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
