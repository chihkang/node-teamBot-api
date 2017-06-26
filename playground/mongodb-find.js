// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/teamWorkApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('CertDetails').find().toArray().then((docs) => {
  //
  //   console.log('CertDetails');
  //
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // },(err) => {
  //   console.log('Unable to fetch CertDetails', err);
  // });

  db.collection('CertDetails').find().count().then((count) => {

    console.log(`CertDetails count: ${count}`);

  },(err) => {
    console.log('Unable to fetch CertDetails', err);
  });

  // db.close();
});
