var { mongoose } = require('./db/mongoose')
var { CertDetails } = require('./models/CertDetails');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/CertDetails', (req, res) => {
  var certThings = new CertDetails({
    "HintCode": req.body.HintCode,
    "Description": req.body.Description
  });
  // console.log(req.body);
  certThings.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/CertDetails',(req, res) => {
  CertDetails.find().then((docs) =>{
    res.send({docs});
  },(e) => {
    res.status(400).send(e);
  })
});

// GET /CertDetails/1324235

app.get('/CertDetails/:hintcode',(req, res) => {
  var hintcode = req.params.hintcode;

  CertDetails.findOne({HintCode:hintcode}).then((doc) =>{
    if(!doc){
      return res.status(404).send();
    }
    res.send({doc});
  }).catch((e) =>{
    res.status(400).send();
  })
  // res.send(req.params);
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = { app };
