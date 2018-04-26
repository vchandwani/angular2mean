var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String, required: true},
    Date: {type: Date, required: true},
    Transaction: {type: String, required: true},
    Amount: {type: Number, required: true},
    Units: {type: Number, required: true},
    Price: {type: Number, required: true},
    Unit: {type: Number, required: true},
    type : {type: String, required: true},
    uid: {type: String, required: true }
});

module.exports = mongoose.model('Portfolio', schema);