const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log("Error connecting to mongodb", err);
    }
    console.log("Successfully connected to mongodb");
    const db = client.db('TodoApp');

    // db.collection('users').deleteMany({ name: "Vamsi"}).then((result) => {
    //     console.log(`${result}`);
    // });

    db.collection('users').findOneAndDelete({age: 26}).then((result) => {
        console.log(result);
    });

    client.close();
});