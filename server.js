const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restaurant");
const FoodRoute = require("./routes/food");
const RatingRoute = require("./routes/rating");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("FoodLY Database connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/category", CategoryRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/foods", FoodRoute);
app.use("/api/rating",RatingRoute);
 // Now FoodRoute is properly defined and used

// Start the server
app.listen(process.env.PORT || 6013, () => 
  console.log(`Foodly Backend is running on port ${process.env.PORT || 6013}!`)
);

