const express = require("express");
const router = express.Router();
const { db } = require("../../db");

router.route("/")
    .get((req, res) => {
        res.status(200).json({message: "GET ACCOUNT"})
    })
    .post((req, res) =>
        res.status(200).json({message:"POST ACCOUNT"})
    );

module.exports = router;