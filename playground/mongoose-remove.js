const {mongoose} = require('./../server/db/mongoose');
const {CertDetails} = require('./../server/models/CertDetails');
const {ObjectID} = require('mongodb');
//595278a4093a31b3d4109408
var id = '595278a4093a31b3d4109408';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// CertDetails.find({
//   _id: id
// }).then((docs) => {
//   console.log('certDetailsDatas', docs);
// });
//
// CertDetails.findOne({
//   _id: id
// }).then((doc) => {
//   console.log('certDetailsData', doc);
// });

CertDetails.findById(id).then((doc) => {
  if(!doc){
    return console.log('Id not found');
  }
  console.log('Query By ID', doc);
}).catch((e) => console.log(e));
