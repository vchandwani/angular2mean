var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String},
    Date: {type: Date},
    Transaction: {type: String},
    Amount: {type: Number},
    Units: {type: Number},
    Price: {type: Number},
    Unit: {type: Number},
    type : {type: String},
    uid: {type: String }
});

module.exports = mongoose.model('Portfolio', schema);