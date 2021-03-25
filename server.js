// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();
var port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.get("/", function(req, res) {
    res.send('Hola desde express');
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});