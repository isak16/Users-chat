var mongoose = require('mongoose');
var fs = require('fs');
var express = require("express");
var app = express();

//Mongoose Connect
mongoose.connect('mongodb://localhost:27017/users-chat');

//Definera databas
var db = mongoose.connection;

//Definera collection
var conversations = db.collection('conversations');
var users = db.collection('users');

var test = {};
fs.readFile('node/testdata.json', (err, data) => {
  if (err) throw err;
  test = JSON.parse(data);
  //console.log(test.users);
});


app.get("/populate", function(request, response) {
   users.drop();
   console.log('removed old test data, users');
   conversations.drop();
   console.log('removed old test data, conversations');
   users.insertMany(test.users, function(err, result){
     if(err){
         console.log(err);
     }else{
         console.log("Insert success!");
     }
   });

   conversations.insertMany(test.conversations, function(err, result){
     if(err){
         console.log(err);
     }else{
         console.log("Insert success!");
     }
   });
});

app.listen(3000);
