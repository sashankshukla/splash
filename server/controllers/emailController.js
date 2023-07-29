const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer');

// Configure Nodemailer with your custom domain email provider's settings
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'splashfinance455@gmail.com', // Your Gmail email address
      pass: process.env.GMAIL_API, // Your Gmail password or App Password
    },
  });

  const approvedFunds = asyncHandler(async (req, res) => {
    const emailContent = `
    The following funding account has been approved by the server admin:
    User: ${req.body.userEmail}
    Name: ${req.body.accountName}
    Account: ${req.body.accountNumber}
    Bank Name: ${req.body.bankName}
  `;
    const mailOptions = {
        from: 'splash@frankeyhe.dev',
        to: req.body.userEmail,
        subject: 'Splash Finance: Funding has been approved',
        text: emailContent,
      };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(404).json(error);
    } else {
        console.log('Email sent:', info.response);
        res.status(200).json({});
    }
  })})


  const denyFunds = asyncHandler(async (req, res) => {
    const emailContent = `
    The following funding account has been approved by the server admin:
    User: ${req.body.userEmail}
    Name: ${req.body.accountName}
    Account: ${req.body.accountNumber}
    Bank Name: ${req.body.bankName}
  `;
    const mailOptions = {
        from: 'splash@frankeyhe.dev',
        to: req.body.userEmail,
        subject: 'Splash Finance: Funding has been denied.',
        text: emailContent,
      };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(404).json(error);
    } else {
        console.log('Email sent:', info.response);
        res.status(200).json({});
    }
  })})
module.exports = { approvedFunds, denyFunds };