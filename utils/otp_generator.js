function generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp.toString().substring(0, 6);
}

module.exports = generateOtp;
