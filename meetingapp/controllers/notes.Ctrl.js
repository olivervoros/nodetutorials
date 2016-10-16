'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');

exports.allUsersNotes = function(req, res) {
	User.find({}).sort({username : 1 }).exec(function(err, users) {
		if(err) {
			console.log('error getting users');
		} else {
			return res.render('newnote', {
				title: 'New Note',
				users: users
			});
		}
	});
}