const express = require('express'),
      app     = express();
      http    = require('http').Server(app);
      port    = process.env.PORT || 5000;
      path    = require('path');
      bodyParser = require('body-parser');
      nodemailer = require('nodemailer');
      mysql = require('mysql');
      fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'mustache');
app.engine('mustache', require('hogan-middleware').__express);

const con = mysql.createPool({
	connectionLimit: 100,
	host: "us-cdbr-iron-east-01.cleardb.net",
	user: "b101f02dd54e99",
	password:"dd79f6d8",
	port: 3306,
	database: "heroku_4a5132c4edcc681",
	debug: 'false',
	connectTimeout: 100000
})

class dataHolder {
  constructor(lat, long, accuracy, id){
    this.lat = lat;
    this.long = long;
    this.accuracy = accuracy;
    this.imgLink = __dirname + '/getfaceimage?id=' + id;
  }
}

app.get("/", (req, res, next) =>{
  res.render("home");
});

app.get("/color", (req, res, next) =>{
  res.render("color");
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
