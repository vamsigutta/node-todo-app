const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log("Error connecting to mongodb", err);
    }
    console.log("Successfully connected to mongodb");
    const db = client.db('TodoApp');

    // db.collection('Todo').insertOne({
    //     text: "something todo",
    //     completed: false
    // }, (err,res) => {
    //     if(err) {
    //         return console.log("error connecting to mongodb");
    //     }

    //     console.log(JSON.stringify(res.ops,undefined,2));
    // })

    db.collection('users').insertOne({
        name : "Vamsi",
        age: 26,
        location: "chennai"
    }, (err,result) => {
        if (err) {
            return console.log('unable to connect to the collection');
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    })

    client.close();
})