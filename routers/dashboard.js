const express = require("express");
const router = express.Router();


router.get("/", (req,res)=>{
    console.log("session: " + JSON.stringify(req.session));
    console.log("user: "+ JSON.stringify(req.user));


    res.render("pages/dashboard");
})




module.exports = router;