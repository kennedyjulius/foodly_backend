const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const generateOtp = require('./utils/otp_generator'); // Import your OTP generator
const sendEmail = require('./utils/smtp_function'); // Import your email sending function
const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restaurant");
const FoodRoute = require("./routes/food");
const RatingRoute = require("./routes/rating");
const AuthRoute = require('./routes/auth'); // Corrected the path
const UserRoute = require('./routes/user'); 
const AddressRoute = require('./routes/address');
const CartRoute = require('./routes/cart');
const OrderRoute = require('./routes/order');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("FoodLY Database connected"))
  .catch((err) => console.log(err));

// Generate OTP and send email for testing
// const otp = generateOtp();
// console.log(otp);
// sendEmail('kennedymutugi111@gmail.com', otp);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/category", CategoryRoute);
app.use("/api/auth", AuthRoute); // Corrected route usage
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/foods", FoodRoute);
app.use("/api/rating", RatingRoute);
app.use("/api/users", UserRoute);
app.use("/api/address", AddressRoute);
app.use("/api/cart", CartRoute);
app.use("/api/orders", OrderRoute);


// Start the server
app.listen(process.env.PORT || 6013, () => 
  console.log(`Foodly Backend is running on port ${process.env.PORT || 6013}!`)
);
