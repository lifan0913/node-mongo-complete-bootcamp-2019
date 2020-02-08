const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define email options
  const emailOptions = {
    from: 'Diogo Silva <hello@diogo.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  console.log('transporter', transporter);
  console.log('emailOptions', emailOptions);

  // 3) Send the email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;