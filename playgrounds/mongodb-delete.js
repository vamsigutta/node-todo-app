const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
    if(err){
        return console.log("Error connecting to mongodb", err);
    }
    console.log("Successfully connected to mongodb");
    const db = client.db('TodoApp');

    // db.collection('users').deleteMany({ name: "Vamsi"}).then((result) => {
    //     console.log(`${result}`);
    // });

    db.collection('users').findOneAndDelete({_id: new ObjectId('5ac426d566a42346d60fbac1')}).then((result) => {
        console.log(result);
    });

    client.close();
});