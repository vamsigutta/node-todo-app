const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log("Error connecting to mongodb", err);
    }
    console.log("Successfully connected to mongodb");
    const db = client.db('TodoApp');

    // db.collection('Todo').findOneAndUpdate({
    //     _id: new ObjectId("5ac2dc50ca1d971399e959cc")
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('users').findOneAndUpdate({
        _id: new ObjectId('5ac42e2566a42346d60fbc6d')
    },{
        $set: {
            name: "Vamsi"
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});