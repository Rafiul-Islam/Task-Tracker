import { config } from "dotenv";
import nodeMailer from "nodemailer";

config();

async function sendEmail(sendTo, subject, mailText = "", mailHTML) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 587, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: sendTo,
    subject: subject,
    text: mailText,
    html: mailHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default sendEmail;
