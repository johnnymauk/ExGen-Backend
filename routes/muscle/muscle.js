const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.send("GET MUSCLE"))
    .post((req, res) => res.send("POST MUSCLE"));
module.exports = router;