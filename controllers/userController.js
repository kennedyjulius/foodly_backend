const User = require('../models/User');
const UserVerification = require('../models/UserVerification');
const bcrypt = require('bcrypt');

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findOne({ userId: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const { password, __v, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    verifyAccount: async (req, res) => {
        const { userId, uniqueString } = req.params;

        try {
            const record = await UserVerification.findOne({ userId });
            if (!record) {
                return res.status(404).json({ message: "Verification record not found or already used." });
            }

            const { expiresAt, uniqueString: hash } = record;

            if (expiresAt < Date.now()) {
                await UserVerification.deleteOne({ userId });
                return res.status(400).json({ message: "Verification link expired." });
            }

            const isMatch = await bcrypt.compare(uniqueString, hash);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid verification link." });
            }

            await User.findOneAndUpdate({ userId }, { verified: true });
            await UserVerification.deleteOne({ userId });

            res.status(200).json({ message: "Account verified successfully!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};


// const User = require('../models/User');
// const Userverification = require('../models/UserVerification');

// module.exports = {
//     getUser: async (req, res) => {
//         try {
//             const user = await User.findById(req.user.id);

//             if (!user) {
//                 return res.status(404).json({ status: false, message: "User not found" });
//             }

//             const { password, __v, createdAt, ...userData } = user._doc;
//             res.status(200).json(userData);
//         } catch (error) {
//             res.status(500).json({ status: false, message: error.message });
//         }
//     },


//     verifyPhone: async (req, res) => {
//         const userOtp = req.body.otp; // Assuming OTP is sent in the request body
//         const phone = req.body.phone; // Assuming phone number is also sent in the request body

//         try {
//             const user = await User.findById(req.user.id);

//             if (!user) {
//                 return res.status(404).json({ status: false, message: "User not found" });
//             }

//             if (userOtp === user.otp) {
//                 user.phoneVerification = true;
//                 user.phone = phone; 

//                 await user.save();
//                 const { password, __v, otp, createdAt, ...others } = user._doc;
//                 return res.status(200).json({ status: true, message: "Phone verified successfully", ...others });
//             } else {
//                 return res.status(400).json({ status: false, message: "OTP verification failed" });
//             }
//         } catch (error) {
//             res.status(500).json({ status: false, message: error.message });
//         }
//     },

    // verifyAccount: async(req , res)=>{
    //     let {userId, uniqueString} = req.parms;


    //     //const {email, otp} = req.body;

    //     try {
    //         const user = await User.findById(req.user.id);

    //         if (!user) {
    //             return res.status(400).json({status: false, message: "User not found"});
    //         }
    //         if (userOtp === user.otp) {
    //             user.verification = true;
    //             user.otp = "none";  

    //             await user.save();
    //             return res.status(200).json({status: true, message: "Account verified successfully"});
    //         }else{
    //             return res.status(400).json({status: false, message: "otp verification failed"});
    //         }
           

           
    //     } catch (error) {
    //         res.status(500).json({status: false, message: error.message});
    //     }
    // },

//     verifyAccount: async (req, res) =>{
//         let {userId, uniqueString} = req.params;


//         Userverification.find({userId}).then((result)=>{
//             if (result.length >0) {
//                 const {expiresAt} = result[0];
//                 const hashedUniqueString = result[0].uniqueString;

                
//                 if (expiresAt <Date.now()) {
//                     Userverification.deleteOne({userId}).then(() =>{
//                         let message = "Link has expired, please sign up again"
//                     }).catch(() => {
//                         console.log(error);
//                         let message = "An error occured while clearing expired user verification "
//                     })
//                 }else{
//                    bcrypt.compare(uniqueString, hashedUniqueString).then((result) =>{
//                     Userverification.deleteOne({userId}).then(() =>{

//                     })
//                    }).catch(error => {
//                     console.log(error);
//                     let message = "An error Occured while finalizing successfull verification";
//                    })
//                 }
//             }else{
//                 let message = "Account record doesn't exist or has been  verified already.Please sign up or log in";
                
//             }
//         }).catch(() =>{
//             console.log(error);cd
//         })
//     },

//     deleteUser: async (req, res) => {
//         try {
//             const user = await User.findByIdAndDelete(req.user.id);

          
            
//             res.status(200).json({status: false , message: "User successfully deleted"});
//         } catch (error) {
//             res.status(500).json({ status: false, message: error.message });
//         }
//     },
// };

