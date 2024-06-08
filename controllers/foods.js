const User = require('../models/user.js');

const index = async (req, res) => {
    try {
        res.render('foods/index.ejs');
    } catch (error) {
        res.redirect('/');
    }
};

const newPage = async (req, res) => {
    try {
        res.render('foods/new.ejs');
    } catch (error) {
        res.redirect('/');
    }
};



module.exports = {
    index,
    newPage,
};