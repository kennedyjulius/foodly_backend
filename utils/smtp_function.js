const nodemailer = require('nodemailer');

async function sendEmail(userEmail, verificationCode) {  // 'verificationCode' passed as a parameter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: "Foodly verification code",
        html: `
            <h1>Foodly Email Verification</h1>
            <p>Your verification code is:</p>
            <h2 style="color: blue;">${message}</h2>
            <p>Please enter this code on the verification page to complete your registration process.</p>
            <p>If you did not request this email, please ignore this email.</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
}

module.exports = sendEmail;
