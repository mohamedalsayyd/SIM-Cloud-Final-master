const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const connectDB = require("./models/db")
const authRouter = require("./routes/authRouter");

const app = express();
const SessionStore = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });

// common middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authentication middlewares
app.use(flash());

//store the session in memory/database. This middleware is responsible for setting cookies to browsers and converts the cookies sent by browsers into req.session object
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: SessionStore,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
  );

require("./passport-config");
app.use(passport.initialize());
app.use(passport.session()); //connect the passport framework to the session management. How? uses req.session object to further deserialize the user.


// routes middlewares
app.use("/", authRouter);


// Start server
const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/products";

connectDB(MONGODB_URI)
.then( () => {
  console.log(`database connected on: ${MONGODB_URI}`)
  app.listen(PORT, () => console.log(`accounts service on: ${PORT}`))
})
.catch((err) => console.log(err.message));