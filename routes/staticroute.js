const express = require("express");
const URL = require("../models/url");
const {generateShortUrl} = require('../controller/url')
const router = express.Router();

router.get("/", async (req, res) => {
//   if (!req.user) return res.redirect("/login");
//   const allurls = await URL.find({ createdBy: req.user._id });
const allurl = await URL.find({});
  return res.render("home", {
    urls: allurl,
  });
});


router.post('/',generateShortUrl);


router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login",{
    error:null
  });
});

module.exports = router;