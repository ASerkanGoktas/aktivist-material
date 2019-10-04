var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static(__dirname + "/app/dist"));

server.listen(PORT, () => {
    console.log("hey")
    console.log(__dirname);
    console.log("listening...");
});