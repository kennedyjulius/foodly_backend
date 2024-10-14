const Food = require('../models/Food');

module.exports = {
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
}