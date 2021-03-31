const express = require("express");
const router = express.Router();


router.get("/", (req,res)=>{
    console.log("session: " + JSON.stringify(req.session));

    res.render("pages/dashboard");
})




module.exports = router;