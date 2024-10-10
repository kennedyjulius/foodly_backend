const express = require('express');
const app = express();
const dotenv = require('dotenv');
const CategoryRoute = require("./routes/category");
const mongoose = require('mongoose');

dotenv.config();
  

mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("FoodLY Database connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/category", CategoryRoute);

app.listen(process.env.PORT || 6013, () => 
  console.log(`Foodly Backend is running on port ${process.env.PORT}!`)
)
