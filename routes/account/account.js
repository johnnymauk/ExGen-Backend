const express = require("express");
const router = express.Router();
const { db } = require("../../db");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = 'mubble';

router.route("/check")
    .get(async (req, res) => {
        if(req.query.email !== null){
            await db
                .query("SELECT COUNT(account_id) FROM account WHERE email=$1 LIMIT 1",[req.query.email])
                .then(obj => {
                    if(parseInt(obj.rows[0].count) === 1){
                        res.status(200).json({info: 1})
                    }else{
                        res.status(404).json({info: 0})
                    }
                })
        }else{
            res.status(400).json({info: undefined})
        }
    });

router.route("/create")
    .post(async (req, res) => {
        if(
            req.body.fname !== null && req.body.lname !== null && req.body.email !== null && req.body.pass !==null
        ){
            await db
                .query("SELECT * FROM _account_c($1,$2,$3,$4)",[req.body.email, req.body.fname, req.body.lname, req.body.pass])
                .then(obj => {
                    res.status(obj.rowCount === 0 ? 404:200).json({info: obj.rows[0]})
                })
                .catch(err => {
                    console.error(err.stack);
                    res.status(500).json({info: undefined})
                })
        }else{
            res.status(400).json({info: undefined})
        }
    });

router.route("/:account_id")

    // GETS ACCOUNT INFORMATION
    .get(async (req, res) => {
        if(Number.isInteger(parseInt(req.params.account_id))){
            await db
                .query("SELECT * FROM _account_r($1);", [req.params.account_id])
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

    // CHANGES TO EVERYTHING EXCEPT PASSWORD
    .post(async (req, res) => {
        if(
            Number.isInteger(parseInt(req.params.account_id)) &&
            req.body.fname !== null && req.body.lname !== null && req.body.email !== null
        ){
            await db
                .query("SELECT * FROM _account_u($1,$2,$3,$4)",[req.params.account_id, req.body.email, req.body.fname, req.body.lname])
                .then(obj => {
                    res.status(obj.rowCount === 0 ? 404:200).json({info: obj.rows[0]})
                })
                .catch(err => {
                    console.error(err.stack);
                    res.status(500).json({info: undefined})
                })
        }else{
            res.status(400).json({info: undefined})
        }
    });

router.route("/:account_id/password_reset")

    // PASSWORD CHANGES
    .post(async (req, res) => {
        if(Number.isInteger(parseInt(req.params.account_id)) && req.body.hash == null){
            await bcrypt.hash(req.body.hash + secret, saltRounds).then( async hash => {
                await db
                    .query('SELECT * FROM _account_u_password($1,$2);',[req.params.account_id, hash])
                    .then(obj => {
                        res.status(obj.rowCount === 0 ? 404:200).json({info: obj.rows[0]})
                    })
                    .catch(err =>{
                        console.error(err.stack);
                        res.status(500).json({info: undefined})
                    })
            })
        }else{
            res.status(400).json({info: undefined})
        }
    });

router.route('/:account_id/delete')
    .delete( async (req, res) => {
        if(Number.isInteger(parseInt(req.params.account_id))){
            await db
                .query('SELECT * FROM _account_d($1);',[req.params.account_id])
                .then(obj => {
                    res.status(obj.rowCount === 0 ? 404:200).json({info: obj.rows[0]})
                })
                .catch(err =>{
                    console.error(err.stack);
                    res.status(500).json({info: undefined})
                })
        }else{
            res.status(400).json({info: undefined})
        }
    });

module.exports = router;