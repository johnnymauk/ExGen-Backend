const express = require("express");
const router = express.Router();
const { db } = require("../../db");

router.route("/")
    .post((req, res) =>
        res.status(200).json({message:"POST ACCOUNT"})
    );

router.route("/:account_id")
    .get(async (req, res) => {
        if(Number.isInteger(parseInt(req.params.account_id))){
            await db
                .query("SELECT * from _account_r($1);", [req.params.account_id])
                .then( obj => {
                    res.status(obj.rowCount === 0 ? 404:200).json({info: obj.rows[0]})
                })
                .catch(err => {
                    console.error(err.stack);
                    res.status(500).json({info: undefined})
                })
        }else{
            res.status(400).json({info: undefined})
        }
    })

module.exports = router;