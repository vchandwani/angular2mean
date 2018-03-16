var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Name: {type: String},
    Date: {type: Date},
    Transaction: {type: String},
    Amount: {type: String},
    Units: {type: String},
    Price: {type: String},
    Unit: {type: String}
});

module.exports = mongoose.model('Portfolio', schema);