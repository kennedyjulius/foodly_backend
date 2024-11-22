const nodemailer = require('nodemailer');

const sendEmail = async (email, verificationLink) => {
    try {
        // Create the transporter using SMTP credentials from the .env file
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,  // Use your email here
                pass: process.env.AUTH_PASSWORD,  // Use your App Password here
            },
        });

        const mailOptions = {
            from: process.env.AUTH_EMAIL,  // Ensure this is the same as SMTP_USER
            to: email,  // Recipient's email
            subject: 'Email Verification',
            text: `Please verify your email address by clicking the link: ${verificationLink}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = sendEmail;
