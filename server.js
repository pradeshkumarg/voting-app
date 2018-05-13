// Create a db connection string

var db = 'mongodb://localhost:27017/voting-app';

// Creating a port for the server to listen

var port = process.env.PORT || 8000;

// Load in Router
var router = require("./routes/api");

// Load in modules

var express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Create an express application

var app = express();

// Load in environment variables

dotenv.config({
  verbose:true
});

// Connect to mongo

mongoose.connect(db,(err)=>{
  if(err){
    console.log(err);
  }
});

// Listen to mongoose connection events

mongoose.connection.on('connected',function() {
  console.log("Successfully opened a connection to "+db);
});


mongoose.connection.on('disconnected',function() {
  console.log("Successfully disconnected from "+db);
});

mongoose.connection.on('error',function() {
  console.log("An error has occurred connecting to "+db);
});

// Configure express middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use('/node_modules',express.static(__dirname+'/node_modules'))
app.use('/vendors',express.static(__dirname+'/vendors'))
app.use('/api',router);
app.use(express.static(__dirname+'/public'));
app.get("*",(req,res,next)=>{
  res.sendFile(__dirname+"/public/index.html");
});

// Start up the server

app.listen(port,function(){
  console.log("Listening on "+port);
});

console.log(process.env.secret);
