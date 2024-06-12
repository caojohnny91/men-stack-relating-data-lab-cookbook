const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

const authController = require("./controllers/auth.js");
const foodsController = require("./routes/foods.js"); // using routes instead of controllers for better organization
const usersRoutes = require("./routes/users.js");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); // comment out it term is too crowded
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    })
);
    

app.use(passUserToView)

// To test the functionality of user sign-in, we need to update our landing page to reflect the user’s sign-in status. This is done by utilizing the req.session object, which is now attached to every request due to our session middleware.
// In our landing page’s route, we’re going to send a user variable to our index.ejs template. This variable is assigned the value of req.session.user, a property we just set during the sign-in process.

// If user is undefined (which happens when req.session.user is not set), it means the visitor isn’t signed in. In this case, our template will treat them as a guest, showing options to sign up or sign in.

// If user has a value (meaning req.session.user is set), the visitor is recognized as a signed-in user. We can then personalize their greeting and omit the sign-up and sign-in links, as they’re already authenticated.
// First, we’ll change the route in server.js to the following:
// app.get("/", (req, res) => {
//   res.render("index.ejs", {
//     user: req.session.user,
//   });
// });
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/foods`);
    } else {
      res.render('index.ejs');
      }
      });
      

app.use("/auth", authController);
app.use(isSignedIn)
app.use('/users/:userId/foods', foodsController);
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
