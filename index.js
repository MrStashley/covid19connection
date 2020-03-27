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

class persistentData {
  constructor(){
    this.loggedin = false;
  }

  setLoggedin(){
    this.loggedIn = true;
  }
}

class dataHolder {
  constructor(categories, persistentData){
    this.categories = categories;
    this.persistentData = persistentData;
  }
}

var perData = new persistentData();

app.get("/", (req, res, next) =>{
  var categories = [];
  con.query("select * from meta_categories", function(err, result, fields){
    if(err)
      console.log(err.stack);

    result.forEach(function(item, index){
      console.log("adding " + item.category + " to categories");
      categories.push(item.category);
    });

    categories.forEach(function(item,index){
      console.log("Category: " + item);
    });

    var data = new dataHolder(categories, perData);
    res.render("home", {data: JSON.stringify(data)});
  });
});

app.get("/color", (req, res, next) =>{
  res.render("color");
});

app.post("/sign-up", (req, res, next) =>{
  console.log("User: " + req.body.user);
  console.log("Email: " + req.body.email);
  console.log("Password: "+ req.body.psw);

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;
