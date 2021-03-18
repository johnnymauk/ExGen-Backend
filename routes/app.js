const express = require( "express" );
const app = express();
app.use(express.json());

app.use("/login", require("./login/login"));
app.use("/account", require("./account/account"));
app.use("/muscle", require("./muscle/muscle"));

app.get("/", (req, res) => res.send("GET ROOT"));
app.post("/",(req, res) => res.send("POST ROOT"));

module.exports = app;