const User = require('../models/User');

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            const { password, __v, createdAt, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },


    verifyPhone: async (req, res) => {
        const userOtp = req.body.otp; // Assuming OTP is sent in the request body
        const phone = req.body.phone; // Assuming phone number is also sent in the request body

        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }

            if (userOtp === user.otp) {
                user.phoneVerification = true;
                user.phone = phone; 

                await user.save();
                const { password, __v, otp, createdAt, ...others } = user._doc;
                return res.status(200).json({ status: true, message: "Phone verified successfully", ...others });
            } else {
                return res.status(400).json({ status: false, message: "OTP verification failed" });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    verifyAccount: async(req , res)=>{
        const userOtp = req.params.otp;
        //const {email, otp} = req.body;

        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(400).json({status: false, message: "User not found"});
            }
            if (userOtp === user.otp) {
                user.verification = true;
                user.otp = "none";  

                await user.save();
                return res.status(200).json({status: true, message: "Account verified successfully"});
            }else{
                return res.status(400).json({status: false, message: "otp verification failed"});
            }
           

           
        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.user.id);

          
            
            res.status(200).json({status: false , message: "User successfully deleted"});
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};
