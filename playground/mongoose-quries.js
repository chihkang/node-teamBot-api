const {mongoose} = require('./../server/db/mongoose');
const {QuestionHelper} = require('./../server/models/QuestionHelper');
const {ObjectID} = require('mongodb');
//595278a4093a31b3d4109408
var id = '595278a4093a31b3d4109408';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// QuestionHelper.find({
//   _id: id
// }).then((docs) => {
//   console.log('QuestionHelperDatas', docs);
// });
//
// QuestionHelper.findOne({
//   _id: id
// }).then((doc) => {
//   console.log('QuestionHelperData', doc);
// });

QuestionHelper.findById(id).then((doc) => {
  if(!doc){
    return console.log('Id not found');
  }
  console.log('Query By ID', doc);
}).catch((e) => console.log(e));
