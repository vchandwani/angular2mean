var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String},
    active: {type: Boolean },
    uid: {type: String  },
    latestPrice: {type: Number },
    datePrice: {type: Date },
    type : {type: String},
});

module.exports = mongoose.model('Fundname', schema);