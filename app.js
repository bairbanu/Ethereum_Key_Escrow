const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// for clustering servers and avoiding etherscan's rate limit, we can use external service for this
// var proxy = require('http-proxy-middleware');
// var apiProxy = proxy('/api/:addr', {target: 'https://inbox-backend-1.herokuapp.com/'});

var routes = require("./routes.js");
app.use("/", routes);

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => console.log("Handoff is listening on port 5000!"));