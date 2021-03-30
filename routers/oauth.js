const express = require("express");
const router = express.Router();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
require("dotenv").config();

const localhostURI = "http://localhost:3000/oauth";


// hand over authentication code to kakao
router.get('/kakao',
    passport.authenticate("kakao", {
        failureRedirect: '/',
    }))


// from kakao, get a request token
router.get('/callback',
    passport.authenticate("kakao", {
        failureRedirect: '/',
    }), (req, res) => {
        res.redirect("/dashboard");
    })


module.exports = router