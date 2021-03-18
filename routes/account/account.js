const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) =>
        res.status(200).json({message:"GET ACCOUNT"})
    )
    .post((req, res) =>
        res.status(200).json({message:"POST ACCOUNT"})
    );
module.exports = router;