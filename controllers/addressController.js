const User = require('../models/User');
const Address = require('../models/Address');


module.exports = {
    addAddress: async (req, res) => {
        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default,
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            userId: req.user.id,
        });

        try {
            if (req.body.default === true) {
                await Address.updateMany({userId: req.user.id}, {default: false})
            }

            await newAddress.save();
            res.status(201).json({status: true, message: "Address successful added"});

        } catch (error) {
           res.status(500).json({status: false, message: error.message}) 
        }
    },


    getAddress: async (req, res) =>{
        try {
            const addresses = await Address.find({userId: req.user.id});
            res.status(200).json(addresses);
        } catch (error) {
           res.status(500).json({status: false, message: error.message}); 
        }
    },


    deleteAddress: async (req, res) =>{
        try {
            await Address.findByIdAndDelete(req.params.id);
            res.status(200).json({status: true, message: "Address successful deleted"})
        } catch (error) {
           res.status(500).json({status: false, message: error.message}); 
        }
    },


    setAddressDefault: async (req, res) => {
        const addressId = req.params.id;
        const userId = req.user.id;

        try {
            await Address.updateMany({userId: userId}, {default: false});

            const updateAddress = await Address.findByIdAndUpdate(addressId, {default: true});

            if (updateAddress) {
                await User.findByIdAndUpdate(userId, {address: addressId});

                res.status(200).json({status: true, message: "Address successfully set to default"});

            }else {
                res.status(400).json({status: false, message: "Address not found"});
            }
        } catch (error) {
           res.status(400).json({status: false, message: error.message}); 
        }
    },


    getDefaultAddress: async (req, res) =>{
        const userId = req.user.id;
        try {
            const address = await Address.findOne({userId: userId, default: true});

            res.status(200).json(address);
        } catch (error) {
           res.status(500).json({status: false, message: error.message}); 
        }
    },
}