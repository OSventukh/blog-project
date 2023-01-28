const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.vethealth.com.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'test@vethealth.com.ua',
    pass: 'Ukp734NLsFCYMw7',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
