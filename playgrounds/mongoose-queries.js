const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {users} = require('./../server/models/user');

var id = '5ac59461487f3c07751bf1f9';

if (! ObjectId.isValid(id)) {
    console.log('ID is not valid');
}

// todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('todos', todos);
// });

// todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo',todo);
// });

// todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('No Valid ID found');
//     }
//     console.log('todo',todo);
// }).catch((e) => console.log(e));

users.findById(id).then((user) => {
    if (! user) {
        return console.log('No user found');
    }
    console.log('user',user);
}).catch((e) => console.log(e));