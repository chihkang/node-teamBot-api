// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/teamWorkApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // "Description" : "Update Cert Error",
  //     "HintCode" : "CA4005"

  // deleteMany
  // db.collection('CertDetails').deleteMany({HintCode:'CA4005'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('CertDetails').deleteOne({HintCode:'CA4015'}).then((result) =>{
  //   console.log(result);
  // })

  // findOneAndDelete
  db.collection('CertDetails').findOneAndDelete({HintCode:"CA4015"}).then((result) => {
    console.log(result);
  });

  // db.close();
});
