var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');
var Schema = mongoose.Schema;

var websiteSchema = new Schema({
	title: {
		type: String,
		required: true
	}
	submittedBy: {
		id: Schema.ObjectId,
		ref: 'User'
	},
	url: {
		type: String,
		required: true,

	},
	description: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}

});

websiteSchema.plugin(searchPlugin, {
	fields: ['title','url','description'];
});

module.exports = mongoose.model('Website', websiteSchema);