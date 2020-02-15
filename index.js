var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
const db = require('./queries');

var http = require('http');
var server = http.Server(app);

app.use(express.static(__dirname + "/dist"));
app.get('/get_event/:event_id', db.get_event);
app.get('/get_prices_of_activity/:id', db.get_prices_of_act);
app.get('/filter_activities_date/:datefirst/:datesecond/:city', db.filter_activities_date);
app.get('/livesearch/:actname', db.liveSearch);
app.get('/filter_types/:type/:subtype', db.filter_types);
app.get('/get_activities_distinct_withCount/:start/:end/:type/:subtype', db.get_activities_distinct_withCount);
app.get('/get_instances/:event_id', db.get_instances);
app.get('/get_places/:type', db.get_places);
app.get('/get_moviesByplace/:place', db.get_moviesByPlace);

server.listen(PORT, () => {
    console.log("hey")
    console.log(__dirname);
    console.log("listening...");
});