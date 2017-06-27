var { mongoose } = require('./db/mongoose')
var { CertDetails } = require('./models/CertDetails');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000.');
});

module.exports = { app };
