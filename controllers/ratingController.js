const Rating = require('../models/Rating');
const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');

module.exports = {
    addRating: async (req, res) => {
        const newRating = new Rating({
            userId: req.body.userId,
            ratingType: req.body.ratingType,
            product: req.body.product,
            rating: req.body.rating
        });

        try {
            // Save the new rating
            await newRating.save();

            if (req.body.ratingType === "Restaurant") {
                // Calculate the average rating for the restaurant
                const restaurants = await Rating.aggregate([
                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: '$product', averageRating: { $avg: '$rating' } } }
                ]);

                if (restaurants.length > 0) {
                    const averageRating = restaurants[0].averageRating;
                    // Update the restaurant's rating
                    await Restaurant.findByIdAndUpdate(req.body.product, { rating: averageRating });
                }
            } else if (req.body.ratingType === "Food") {
                // Calculate the average rating for the food
                const foods = await Rating.aggregate([
                    { $match: { ratingType: req.body.ratingType, product: req.body.product } },
                    { $group: { _id: '$product', averageRating: { $avg: '$rating' } } }
                ]);

                if (foods.length > 0) {
                    const averageRating = foods[0].averageRating;
                    // Update the food's rating
                    await Food.findByIdAndUpdate(req.body.product, { rating: averageRating }, { new: true });
                }
            }

            res.status(200).json({ status: true, message: "Rating added and updated successfully." });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};
