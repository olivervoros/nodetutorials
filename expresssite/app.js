var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('index', { title: 'Welcome!' });
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact');
});

app.post('/contact/send', function(req, res) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'email',
			password: 'password'
		}
	});

	var mailOptions = {
		from: 'TODO',
		to: 'TODO',
		subject: "Contact us form submitted",
		text: "You have a submission with the following details, name: " + req.body.name + " email: " + req.body.email +
		" message: " + req.body.message,
		html: "<p>You have a submission with the following details, name: " + req.body.name + " email: " + req.body.email +
		" message: " + req.body.message + "</p>"
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log('error');
			res.redirect('/');
		} else {
			console.log('Message sent.' + info.response);
			res.redirect('/');
		}
	});
});


app.listen(3000);
console.log('server is running on port 3000');