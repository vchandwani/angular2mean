var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String},
    active: {type: Boolean }
});

module.exports = mongoose.model('Fundname', schema);