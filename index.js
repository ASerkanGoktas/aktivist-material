var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
const db = require('./queries');

var http = require('http');
var server = http.Server(app);

app.use(express.static(__dirname + "/dist"));
app.get('/deneme', db.getAll);

server.listen(PORT, () => {
    console.log("hey")
    console.log(__dirname);
    console.log("listening...");
});