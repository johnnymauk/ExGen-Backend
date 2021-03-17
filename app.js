const express = require( "express" );
const app = express();
const port = 8080; // default port to listen

app.use("/login", require("src/routes/login"));
app.use("/account", require("src/routes/account"));
app.use("/muscle", require("src/routes/muscle"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
app.get("/", (req, res) => res.send("GET ROOT"));
app.post("/",(req, res) => res.send("POST ROOT"));
