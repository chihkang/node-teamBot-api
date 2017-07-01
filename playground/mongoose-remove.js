const {mongoose} = require('./../server/db/mongoose');
const {QuestionHelper} = require('./../server/models/QuestionHelper');
const {ObjectID} = require('mongodb');


// QuestionHelper.remove({}).then((result) => {
//   console.log(result);
// });

// QuestionHelper.findOneAndRemove
// QuestionHelper.findByIdAndRemove

QuestionHelper.findOneAndRemove({HintCode:'CARA5003'}).then((doc) =>{
  console.log(doc);
});
