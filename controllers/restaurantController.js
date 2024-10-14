const Restaurant = require("../models/Restaurant");

module.exports = {
    addRestaurant: async (req, res) => {
        const { title, time, imageUrl, pickup, delivery, isAvailable, owner, code, logoUrl, coords } = req.body;
        try {
            if (!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords || !coords.latitude || !coords.longitude || !coords.address || !coords.title) {
                return res.status(400).json({ status: false, message: "You have a missing field" });
            }
    
            const newRestaurant = new Restaurant(req.body);
            await newRestaurant.save();
            res.status(201).json({ status: true, message: "Restaurant has been successfully added" });
    
        } catch (error) {
            console.error("Error in addRestaurant: ", error);  // Add this to log the error
            res.status(500).json({ status: false, message: error.message });
        }
    },
    

    getRestaurantById: async (req, res) => {
        const id = req.params.id;
        try {
            const restaurant = await Restaurant.findById(id);
            if (!restaurant) {
                return res.status(404).json({ status: false, message: "Restaurant not found" });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getAllNearByRestaurants: async (req, res) => {
        const code = req.params.code;
        try {
            let allNearByRestaurants = [];

            if (code) {
                allNearByRestaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true, code: code } },
                    { $project: { __v: 0 } },
                ]);
            }

            if (allNearByRestaurants.length === 0) {
                allNearByRestaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true } },
                    { $project: { __v: 0 } },
                ]);
            }

            res.status(200).json(allNearByRestaurants);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomRestaurants: async (req, res) => {
        const code = req.params.code;
        try {
            let randomRestaurants = [];

            if (code) {
                randomRestaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true, code: code } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }

            if (randomRestaurants.length === 0) {
                randomRestaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } },
                ]);
            }

            res.status(200).json(randomRestaurants);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};
