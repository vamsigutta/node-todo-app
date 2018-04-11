const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {users} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res) => {
    // console.log(req.body);
    var newtodo = new todo({
        text: req.body.text
    });

    newtodo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.listen(3000,() => {
    console.log("Server started listening on port 3000");
});

module.exports={app};