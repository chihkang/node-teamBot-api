var { mongoose } = require('./db/mongoose')
var { QuestionHelper } = require('./models/QuestionHelper');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/QuestionHelper', (req, res) => {
  var certThings = new QuestionHelper({
    "HintCode": _.toUpper(req.body.HintCode),
    "Description": req.body.Description
  });
  // console.log(req.body);
  certThings.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/QuestionHelper',(req, res) => {
  QuestionHelper.find().then((docs) =>{
    res.send({docs});
  },(e) => {
    res.status(400).send(e);
  })
});

// GET /QuestionHelper/1324235

app.get('/QuestionHelper/:hintcode',(req, res) => {
  var hintcode = req.params.hintcode;

  QuestionHelper.findOne({HintCode:_.toUpper(hintcode)}).then((doc) =>{
    if(!doc){
      return res.status(404).send();
    }
    res.send({doc});
  }).catch((e) =>{
    res.status(400).send();
  })
  // res.send(req.params);
});

// GET /KeyWordsHelper/:keyword
app.get('/KeyWordsHelper/:keyword',(req, res) => {
  var keyword = req.params.keyword;

  // select * from QuestionHelper where Description like '%keyword%''
  QuestionHelper.find({ Description: new RegExp(keyword,'i')}).then((doc) =>{
    if(!doc){
      return res.status(404).send();
    }
    res.send({doc});
  }).catch((e) =>{
    res.status(400).send();
  })
  // res.send(req.params);
});

app.delete('/QuestionHelper/:hintcode',(req, res) =>{
  var hintcode = req.params.hintcode;
  QuestionHelper.findOneAndRemove({HintCode:_.toUpper(hintcode)}).then((doc) =>{
    if(!doc){
      return res.status(404).send();
    }
    res.send({doc});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.patch('/QuestionHelper/:hintcode',(req, res) => {
  var hintcode = _.toUpper(req.params.hintcode);
  var body = _.pick(req.body,['HintCode','Description']);
  // console.log(req);
  QuestionHelper.findOneAndUpdate({
    HintCode:hintcode
  },{
    $set: body
  },{
    new:true
  }).then((doc) =>{
    if(!doc){
      return res.status(404).send();
    }
    // console.log(doc);
    res.send({doc});
  }).catch((e) =>{
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = { app };
