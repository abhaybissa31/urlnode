const userModel = require("../models/user")
const URL = require('../models/url');
const {v4: uuidv4} = require('uuid');

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await userModel.create({
        name,
        email,
        password
    });
    const allurl = await URL.find({});
    return res.render("home",{
      urls: allurl
    })
};


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
        return res.render('login', {
            error: "Invalid email or password."
        });
    }
    console.log('login function running........');
    const sessionID = uuidv4();
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}