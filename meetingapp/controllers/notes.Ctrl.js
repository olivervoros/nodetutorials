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

exports.createNote = function(req, res) {
	var newNote = new Note();
	newNote.memberName = req.body.memberName;
	newNote.project = req.body.project;
	newNote.workYesterday = req.body.workYesterday;
	newNote.workToday = req.body.workToday;
	newNote.impediment = req.body.impediment;

	newNote.save(function(err) {
		if(err) {
			var errMsg = 'Sorry there was an error saving ' + err;
			res.render('newnote', {
				title: 'New Note Error',
				message: errMsg
			});
		} else {
		console.log('Meeting note has been saved');
		res.redirect(301, '/');
	}
	})
}