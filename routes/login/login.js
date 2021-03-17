const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.send("GET LOGIN"))
    .post((req, res) => res.send("POST LOGIN"));
module.exports = router;