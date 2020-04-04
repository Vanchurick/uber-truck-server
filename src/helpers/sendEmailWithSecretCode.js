const nodemailer = require("nodemailer");

const config = require("config");
const {service, email, password} = config.get("emailConfig");

const sendEmailWithSecretCode = async (userEmail, secretCode) => {
  const transporter = nodemailer.createTransport({
    service,
    auth: {
      user: email,
      pass: password,
    },
  });

  const info = await transporter.sendMail({
    from: email,
    to: userEmail,
    subject: "Reset password",
    html: `<p style="text-align: center; font-weight: bold">
    Your secret code for reset password</p>
    <p style="text-align: center; color: #ff0000; font-size: 24px">
    ${secretCode}</p>`,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmailWithSecretCode;
