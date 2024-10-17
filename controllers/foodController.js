const Food = require('../models/Food');

module.exports = {
    addFoods: async (req, res) => {
        const { title, foodTags, category, code, restaurant, description, time, price, additives, imageUrl } = req.body;
        if (!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl) {
            return res.status(400).json({ status: false, message: "Missing required fields" });
        }
        try {
            const newFood = new Food(req.body);
            await newFood.save();
            res.status(201).json({ status: true, message: "Food successfully added" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodById: async (req, res) => {
        try {
            const food = await Food.findById(req.params.id);
            if (!food) {
                return res.status(404).json({ status: false, message: "Food not found" });
            }
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFood: async (req, res) => {
        try {
            const foods = await Food.aggregate([
                { $match: { code: req.params.code, isAvailable: true } },
                { $sample: { size: 5 } },
                { $project: { __v: 0 } }
            ]);
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodsByRestaurant: async (req, res) => {
        try {
            const foods = await Food.find({ restaurant: req.params.id });
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodsByCategoryAndCode: async (req, res) => {
        try {
            const foods = await Food.find({
                category: req.params.category,
                code: req.params.code,
                isAvailable: true
            }).select('-__v');
            res.status(200).json(foods.length ? foods : []);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    searchFoods: async (req, res) => {
        try {
            const results = await Food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: req.params.search,
                            path: { wildcard: '*' }
                        }
                    }
                }
            ]);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFoodsByCategoryAndCode: async (req, res) => {
        try {
            let foods = await Food.aggregate([
                { $match: { category: req.params.category, code: req.params.code, isAvailable: true } },
                { $sample: { size: 10 } }
            ]);

            if (!foods.length) {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 10 } }
                ]);
            }
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
};
