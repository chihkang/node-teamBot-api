var mongoose = require('mongoose');

var CertDetails = mongoose.model('CertDetails', {
  HintCode:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  Description:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  updateAt:{
    type: Number,
    default: null
  }
});

module.exports = { CertDetails };
