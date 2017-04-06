var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost:27017/users-chat");
var db = mongoose.connection;
var users = db.collection("users");
var conversations = db.collection("conversations");

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**************************************************
 * API:
 * 1. Miscellaneous and middleware ( authorize, login, register )
 * 2. Users
 * 3. Conversations
 *
 * To do:
 * Login router
 * Send header / cookie
 * Validate before responding
 **************************************************/

 ////////////////////////////////////////
 //////////// 1. Misc ///////////////////
 ////////////////////////////////////////

app.post("/login", function(request, response) {
    console.log(request.body.email + request.body.password);
    users.findOne({email: request.body.email, password: request.body.password}, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        if (result) {
            delete result.password;
            response.send(result);
        } else {
            response.send("Invalid email / password");
        }
    });
});

////////////////////////////////////////
//////////// 2. Users //////////////////
////////////////////////////////////////

/**
 * GET object with quantity and users array properties
 * @type function
 * @return Object
 */
app.get("/users", function(request, response) {
    users.find().toArray(function(error, result) {
        if (error) {
            response.status(500).send(error);
            return;
        }
        response.send({
            quantity: result.length,
            entries: result
        });
    });
});

/**
 * GET object with user related to a specific ID
 * @type function
 * @return Object
 */
app.get("/users/:id", function(request, response) {
    users.findOne({ _id: request.params.id }, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return;
        }
        response.send(result);
    });
});

/**
 * POST an object to the users collection
 * @type function
 * @return true|false
 */
app.post("/users", function(request, response) {
    console.log("incoming post to users");
    users.find({ email: request.body.email }).toArray(function(error, result) {
        if (error) {
            console.log("error");
            response.status(500).send(error);
            return false;
        } else if (result.length < 1) {
            console.log("inserting user");
            request.body.group_chats = [];
            users.insertOne(request.body, function(error, result) {
                if (error) {
                    response.status(500).send(error);
                    return false;
                } else if (result) {
                    console.log("user inserted");
                    delete result.password
                    response.send(result);
                }
            });
        }
    });
});

/**
 * PUT an object to replace user properties
 * @type function
 * @return Object|false
 */
app.put("/users/:id", function(request, response) {
    users.updateOne(
        { _id: request.params.id },
        {
            "display_name": request.body.display_name,
            "email": request.body.email,
            "password": request.body.password
        }, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        response.send(request.body);
    });
});

////////////////////////////////////////
///////// 3. Conversations /////////////
////////////////////////////////////////

/**
 * GET all conversations tied to a specific user
 * @type function
 * @return Object|false
 */
app.get("/conversations/:userid", function(request, response) {
    // needs to return false if header isn't validated
    conversations.find({
        members: { "$in" :  [parseInt(request.params.userid)]}
    }).toArray(function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        response.send({
            quantity: result.length,
            entries: result
        });
    });
});

/**
 * GET a specific conversation
 * @type function
 * @return Object|false
 */
app.get("/conversations/:userid/:convid", function(request, response) {
    conversations.find({
        members: { $in: request.params.userid },
        _id: request.params.convid
    }, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        response.send(result);
    });
});

/**
 * POST a new conversation object
 * @type function
 * @return true|false
 */
app.post("/conversations", function(request, response) {
    if (request.body.members.length < 2) {
        response.status(500).send(error);
        return false;
    }

    if (!request.body.hasOwnProperty("last_timestamp")) {
        request.body.last_timestamp = new Date();
    }

    conversations.insertOne(request.body, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        } else if (result) {
            response.send("OK");
        }
    })
});

/**
 * Perform an action on a conversation group array, i.e add or remove
 * @type function
 */
app.put("/conversations/members/:convid/:action", function(request, response) {
    var _query = {};
    switch (request.params.action) {
        case 'remove':
            _query = {$pull: {members: request.body.userid}};
        break;
        case 'add':
            _query = {$push: {members: request.body.userid}};
        break;
    }

    conversations.updateOne({ _id: request.params.convid }, _query, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        } else if (result) {
            response.send(result);
        }
    });
});

/**
 * PUT a message into a conversation
 * @type function
 * @return true|false
 */
app.put("/conversations/message/:convid", function(request, response) {
    conversations.updateOne({
        _id: request.params.convid,
        members: { $in: request.body.userid }
    },
    {
        messages: { $push: {
            from: request.body.userid,
            content: request.body.content,
            date: Math.floor(new Date() / 1000)
        }}
    }, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        } else if (result) {
            response.status(result);
        }
    });
});

app.listen(3000);
