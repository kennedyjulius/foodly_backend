const Restaurant = require("../models/Restaurant")

module.exports = {
    addRestaurant: async (req, res) => {
        const {title, time, imageUrl, pickup, delivery, isAvailbale, owner, code, logoUrl, coords} = req.body;
        try {
            if (!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords || !coords.latitude || !coords.longitude  ||  !coords.address ||  !coords.title ) {
                return res.status(400).json({status: false, message: "You have a misssing field"});
            }
            try {
                const newRestaurant = new Restaurant(req.body);
                await newRestaurant.save();
                res.status(201).json({status: true, message: "Restaurant has been successfully"});
            } catch (error) {
                res.status(500).json({ status: false, message: error.message})
            }
        } catch (error) {
            
        }
    },
    getRestaurantById: async (req, res) => {
        const id = req.params.id;
        try {
          const restaurant = await Restaurant.findById(id);
          res.status(200).json(restaurant); 
        } catch (error) {
          res.status(500).json({status: false, message: error.message});  
        }
    },

    getAllNearByRestaurants: async (req, res) => {
        try {
          const code = req.params.code;
            try {
              let randomRestaurant = [];
              
              if (code) {
                randomRestaurant = Restaurant.aggregate([])
              }
            } catch (error) {
                
            }
        } catch (error) {
            
        }
    },

    getRandomRestaurants: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },

}