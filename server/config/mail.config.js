let nodemailer = require("nodemailer");
pass = process.env.MAILER_PASS;

smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "chadi.troudi@esprit.tn", //Remove '@gmail.com' from your username.
    pass: "193JMT4487",
  },
});

module.exports = smtpTransport;
