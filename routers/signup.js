
const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");
const csrf = require("csurf");
const csrfProtection = csrf({cookie: true});

router.get("/",csrfProtection ,(req, res)=>{

    // csrf token 사용
    res.render("pages/signup", {csrfToken: req.csrfToken()})
})
router.post("/", csrfProtection,(req, res)=>{
    console.log(sanitizeHtml());

    res.redirect("/signup");
})


module.exports = router