const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "test.mail.9878@gmail.com",
    pass: "mvug ymaz jssn qzqc",
  },
});

const sendVerificationEmail = (email, verificationToken) => {
  const mailOptions = {
    from: "test.mail.9878@gmail.com",
    to: email,
    subject: "Weryfikacja adresu e-mail",
    text: `Kliknij ten link, aby zweryfikować swój adres e-mail: http://localhost:3000/api/auth/verify/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Błąd wysyłania e-maila:", error);
    } else {
      console.log("E-mail wysłany:", info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
};
