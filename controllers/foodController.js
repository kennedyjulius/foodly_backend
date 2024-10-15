const Food = require('../models/Food');

module.exports = {
    addFoods: async (req, res) => {
        const { title, foodTags, category, code, restaurant, description, time, price, additives, imageUrl } = req.body;
        if (!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl) {
            return res.status(400).json({ status: false, message: "You have a missing field" });
        }
        try {
            const newFood = new Food(req.body);
            await newFood.save();
            res.status(201).json({ status: true, message: "Food has been successfully added" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodById: async (req, res) => {
        const id = req.params.id;
        try {
            const food = await Food.findById(id);
            if (!food) {
                return res.status(404).json({ status: false, message: "Food not found" });
            }
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFood: async (req, res) => {
        const code = req.params.code;
        try {
            let foods = [];
            if (code) {
                foods = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ]);
            }
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await Food.find({
                category,
                code,
                isAvailable: true
            }).select('-__v');
            if (foods.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    searchFoods: async (req, res) => {
        const search = req.params.search;
        try {
            const results = await Food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: '*'
                            }
                        }
                    }
                }
            ]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};
