// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/teamWorkApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('CertDetails').findOneAndUpdate({
    _id: new ObjectID('595111c8d32254aba8f64aea')
  }, {
    $set: {
      HintCode: 'CA9990'
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
