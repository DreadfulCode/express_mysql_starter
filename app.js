/**
Express + Mysql Starter Package
*/

var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
	database     : 'db_name',
	host     : 'host',
	user     : 'username',
	password : 'password',
});

/*  Test Query
connection.query('SELECT * FROM `badges` WHERE 1', function(err, rows) {
	console.log(rows);// connected! (unless `err` is set)
});  
*/

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', function(req,res) {
	res.sendfile('public/index.html');
});


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
