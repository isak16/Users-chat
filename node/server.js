var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userschat");

var db = mongoose.connection;

var messages = db.collection("messages");

var users = db.collection("users");

console.log("server is running");