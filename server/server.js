require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

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

app.get('/todos',(req,res) => {
    todo.find().then((todos) => {
        res.send({todos})
    }),(err) => res.status(400).send(err);
});

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if (! ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    todo.findById(id).then((todo) => {
        if (! todo) {
            res.status(404).send();
        }
        res.send({todo});
    },(e) => {
        res.status(400).send();
    })
});

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(! ObjectId.isValid(id)) {
       return res.status(404).send();
    }

    todo.findByIdAndRemove(id).then((todo) => {
        if (! todo) {
            res.status(404).send();
        }
        res.send({todo});
    }, (e) => {
        res.send(404).send();
    })
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(! ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if( _.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    todo.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo) => {
        if(! todo) {
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(404).send();
    })
});

app.listen(process.env.PORT,() => {
    console.log("Server started listening on port 3000");
});

module.exports={app};