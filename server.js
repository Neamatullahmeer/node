require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 connect MongoDB
db();


// Middleware to parse JSON bodies  
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import person routes
const personRoutes = require("./routes/personRoute");
app.use("/persons", personRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
