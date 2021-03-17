const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.send("GET ACCOUNT"))
    .post((req, res) => res.send("POST ACCOUNT"));
module.exports = router;