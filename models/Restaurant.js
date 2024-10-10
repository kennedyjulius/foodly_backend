const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    imageUrl: {type: Array, default: []},
    foods: {type: String, required: true},
    pickup: {type: String, required: true},
    delivery: {type: String, required: true},
    isAvailable: {type: String, required: true},
    owner: {type: String, required: true},
    code: {type: String, required: true},
    logoUrl: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5, default: 3},
    ratingCount: {type: String, default: "267"},
    verification: {type: String, default: "Pending", enum: ["Pending", "Verified", "Rejected"]},
    verificationMessage: {type: String, default: "Your restaurant is under review.we will notify you once it is verified."},
    coords: {
        id: {type: String},
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
        latitudeDelta: {type: Number, required: true},
        longitudeDelta: {type: Number, required: true},
        address: {type: String, required: true},
        title: {type: String, require: true},
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema)