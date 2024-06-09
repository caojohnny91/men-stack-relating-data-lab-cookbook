const User = require("../models/user.js");

const index = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
      user: currentUser,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

const newPage = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/new.ejs", { user: currentUser });
  } catch (error) {
    res.redirect("/");
  }
};

const create = async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.user._id);
    foundUser.pantry.push(req.body);
    await foundUser.save();
    res.redirect(`/users/${foundUser._id}/foods`);
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

const show = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render("foods/show.ejs", { food });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const deleteFood = async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = {
  index,
  newPage,
  create,
  show,
  deleteFood,
};
