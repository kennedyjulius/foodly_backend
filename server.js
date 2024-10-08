const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

dotenv.config();
const mongoose = require('mongoose');  

mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("FoodLY Database connected"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT || 6013, () => 
  console.log(`Foodly Backend is running on port ${process.env.PORT || 6013}!`)
);
