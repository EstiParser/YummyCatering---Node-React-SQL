const { sendEmail } = require('../Services/sendEmailService');

const sendEmailHandler = async (req, res) => {
    const { recipientEmail, emailTitle, messageBody } = req.body;    
    try {
        await sendEmail(recipientEmail, emailTitle, messageBody);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};

module.exports = {
    sendEmailHandler
};