var express = require('express');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost:27017/users-chat");
var db = mongoose.connection;

/**
 * Schemas for users and conversations
 * @type Schema
 */
var userSchema = new Schema({
    display_name: String,
    email: String,
    password: String,
    avatar: {
        type: String,
        default: "https://fortunedotcom.files.wordpress.com/2015/01/unicornprofilepic.jpg?w=1100&quality=85"
    },
    chats: {
        type: Array,
        default: ["58e629b3c5dd18eb286d12d6"]
    },
    status: String,
    bio: String,
    lightTheme: Boolean
});

var conversationSchema = new Schema({
    display_name: String,
    last_timestamp: String,
    avatar: {
        type: String,
        default: "http://i.imgur.com/qBqEnpT.png"
    },
    members: [
        {
            _id: {
                type: String,
                ref: 'user'
            }
        }
    ],
    messages: [{
        from: {
            type: String,
            ref: 'user'
        },
        content: String,
        date: Number
    }]
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * Models of the users and conversations, using the schemas
 */
var users = mongoose.model("user", userSchema);
var conversations = mongoose.model("conversations", conversationSchema);

/**
 * Create a general chat room if it doesn't exist
 */
conversations.findOneAndUpdate({_id: "58e629b3c5dd18eb286d12d6"}, {$setOnInsert: {display_name: "#general", avatar: "https://tracker.phpbb.com/secure/projectavatar?pid=10010&avatarId=10011", members: []}}, {upsert: true}).exec();

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
    users.findOne({email: request.body.email, password: request.body.password}, {password: false}).exec(function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        if (result) {
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
    users.find().exec(function(error, result) {
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
    users.findById(request.params.id).exec(function(error, result) {
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
    users.find({ email: request.body.email }).exec(function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        } else if (result.length === 0) {
            var newUser = new users(request.body);
            newUser.save(function(error, result) {
                if (error) {
                    response.status(500).send(error);
                    return false;
                } else if (result) {
                    // success, now add this user to the general chat
                    conversations.findByIdAndUpdate("58e629b3c5dd18eb286d12d6", {$push: {members: {_id:result._id.toString()}}}).exec();
                    response.send(result);
                }
            });
        } else {
            response.send("Email is already registered.");
        }
    });
});

/**
 * PUT an object to replace user properties
 * @type function
 * @return Object|false
 */
app.put("/users/:id", function(request, response) {
    if (request.body.avatar == null || request.body.avatar == "") {
        request.body.avatar = "https://fortunedotcom.files.wordpress.com/2015/01/unicornprofilepic.jpg?w=1100&quality=85";
    }
    users.findByIdAndUpdate(request.params.id, request.body, {upsert: true}, function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        response.send(request.body);
    });
});

/**
 * Search for users in sidebar
 * @return Array
 */
app.get("/users/search/:name", function(request, response) {
    users.find({display_name: {$regex: request.params.name, $options: 'i'} } , {'display_name': true, '_id': true, 'email': true, avatar: true}).exec(function (error, result) {
        if (error) {
            response.status(500).send(error);
        }
        response.send(result);
    });
});

////////////////////////////////////////
///////// 3. Conversations /////////////
////////////////////////////////////////

/**
 * GET all conversations tied to a specific user (sidebar)
 * @type function
 * @return Object|false
 */
app.get("/conversations/:userid", function(request, response) {
    // needs to return false if header isn't validated
    conversations.find({
        members: {$in: [{_id:request.params.userid}]} // doesnt find object ID
    }).populate({path: 'members._id', select: 'display_name avatar _id'}).exec(function(error, result) {
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
    conversations.findOne({
        members: { $in: [{_id: request.params.userid} ] },
        _id: request.params.convid
    }).populate({path: 'messages.from', select: 'display_name avatar _id'}).populate({path: 'members._id', select: 'display_name avatar _id'}).exec(function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        }
        if (result) {
            response.send(result);
        } else {
            conversations.findOne({members: { $size: 2, $all: [{_id: request.params.userid}, {_id: request.params.convid}]}}).populate({path: 'messages.from', select: 'display_name avatar _id'}).populate({path: 'members.entry', select: 'display_name avatar _id'}).exec(function(error, result) {
                if (error) {
                    response.status(500).send(error);
                    return false;
                }
                if (result) {
                    response.send(result);
                }
            });
        }
    });
});

/**
 * POST a new conversation object
 * @type function
 * @return true|false
 */
app.post("/conversations", function(request, response) {
    if (request.body.members.length < 2) {
        response.status(500).send("Needs to be atleast two members in a chat room.");
        return false;
    }

    if (request.body.avatar == null || request.body.avatar == "") {
        request.body.avatar = "http://i.imgur.com/qBqEnpT.png";
    }

    request.body.display_name = "#" + request.body.display_name.replace(/#/g, '');

    if (!request.body.hasOwnProperty("last_timestamp")) {
        request.body.last_timestamp = Math.floor(new Date() / 1000);
    }

    var newConv = new conversations(request.body);
    newConv.save(function(error, doc) {
        if (error) {
            response.status(500).send(error);
        }
        if (doc) {
            users.update({$in: {_id:[doc.members]}}, {$push: { chats: doc._id}}).exec(function(err, usr) {
                response.send(doc);
            });
        }
    });
});

/**
 * Update info on conversation rooms
 * @type function
 */
app.put("/conversations/:convid", function(request, response) {
    if (request.body.avatar == null || request.body.avatar == "") {
        request.body.avatar = "http://i.imgur.com/qBqEnpT.png";
    }

    request.body.display_name = "#" + request.body.display_name.replace(/#/g, '');
    conversations.findByIdAndUpdate(request.params.convid, request.body, {new: true}, function(error, result) {
        if (error) {
            response.status(500).send(error);
        }
        if (result) {
            response.send(result);
        }
    });
});

/**
 * PUT a message into a conversation
 * @type function
 * @return true|false
 */
app.put("/conversations/message/:convid/:userid", function(request, response) {
    var message = {
        from: request.params.userid,
        content: request.body.message,
        date: Math.floor(new Date() / 1000)
    }

    conversations.findOneAndUpdate({
        members: { $in: [{_id: request.params.userid}] },
        _id: request.params.convid
    },
    { $push: {
        messages: message
    }, $set: {
        last_timestamp: message.date
    }},
    function(error, result) {
        if (error) {
            response.status(500).send(error);
            return false;
        } else if (result) {
            response.send(result);
        } else {
            conversations.findOneAndUpdate({
                members: { $size: 2, $all: [{_id: request.params.userid}, {_id: request.params.convid}] }
            },
            { $push: {
                messages: message
            }, $set: {
                last_timestamp: message.date
            }},
            function(error, result) {
                if (error) {
                    response.status(500).send(error);
                } else if (result) {
                    response.send(result);
                } else {
                    var newConv = new conversations({members: [{_id: request.params.userid}, {_id: request.params.convid}], messages: [message]});
                    newConv.save(function(error, doc) {
                        if (error) {
                            response.status(500).send(error);
                        }
                        if (doc) {
                            users.update({_id: { $in: [{_id: request.params.userid}, {_id: request.params.convid}]}}, {$push: {chats: doc._id}}).exec();
                            response.send(doc);
                        }
                    });
                }
            });
        }
    });
});

/**
 * Perform an action on a conversation, i.e remove or add member
 * @type function
 */
app.put("/conversations/members/:action/:convid", function(request, response) {
    switch (request.params.action) {
        case 'add':
            var _query = {$push: {members: {_id: request.body._id}}};
        break;
        case 'remove':
            var _query = {$pull: {members: {_id: request.body._id}}};
        break;
    }
    conversations.findByIdAndUpdate(request.params.convid, _query, {new: true}).populate({path: 'messages.from', select: 'display_name avatar _id'}).populate({path: 'members._id', select: 'display_name avatar _id'}).exec(function(err, result) {
        if (err) {
            response.status(500).send(err);
        }
        if (result) {
            response.send(result);
        }
    })
});

app.listen(3000);
