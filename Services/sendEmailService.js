const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function sendEmail(recipientEmail, emailTitle, messageBody) {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: recipientEmail,
        subject: emailTitle, // השתמש ב-emailTitle עבור נושא המייל
        html: messageBody, // השתמש ב-messageBody עבור גוף המייל
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail
};