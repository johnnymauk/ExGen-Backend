const { Pool } = require("pg");

const dbconfig = {
    user: "postgres",
    host: "10.0.3.101",
    database: "exgen",
    password: "\\\\[Postgres2021]\\\\",
    port: 5432
}

const db = new Pool(dbconfig)

module.exports = { db };

