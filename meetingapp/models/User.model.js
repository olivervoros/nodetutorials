var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String
});

module.exports = mongoose.model('User',UserSchema);
