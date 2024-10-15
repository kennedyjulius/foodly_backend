const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');

const FoodSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    foodTags: {type: Array, required: true},
    category: {type: String, required: true},
    foodType: {type: String, required: true},
    code: {type: String, required: true},
    isAvailable: {type: Boolean, default: true},
    restaurant: {type: mongoose.Schema.Types.ObjectId, required: true},
    rating: {type: Number, min: 1, max: 5, default: true},
    ratingCount: {type: String, default: "267"},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    additives: {type: Array, default: []},
    imageUrl: {type: String, required: true},
});

module.exports = mongoose.model('Food', FoodSchema)