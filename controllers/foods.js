const User = require('../models/user.js');

const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', { pantry: currentUser.pantry, user: currentUser });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

const newPage = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/new.ejs', { user: currentUser });
    } catch (error) {
        res.redirect('/');
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
        res.redirect('/');
    }
};

module.exports = {
    index,
    newPage,
    create,
};
