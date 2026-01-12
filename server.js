require("dotenv").config();

const express = require("express");
const db = require("./db");
const Person = require("./person");

const app = express();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

// Passport.js configuration
app.use(passport.initialize());

passport.use(new localStrategy(
  async (USERNAME, password, done) => {
    try {
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordMatch = user.password === password ? true : false; // In production, use hashed passwords

      if (isPasswordMatch) {
        return done(null, user);  
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const authent = passport.authenticate('local', { session: false });

// 🔥 connect MongoDB
db();

// middleware function to log requests
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] request for '${req.originalUrl}' - Method: ${req.method}`);
  next();
};

app.use(logRequest);

// Middleware to parse JSON bodies  
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import person routes
const personRoutes = require("./routes/personRoute");
app.use("/persons", authent, personRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Person API");
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
