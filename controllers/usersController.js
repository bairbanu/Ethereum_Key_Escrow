var User = require('../models/user.js');

exports.all = function(req, res){
	User
		.fetchAll()
		.then(function(users){
			res.json({users})
		});
};

exports.create = function(req, res){
	console.log(req.body);
	new User({
		emailAddress: req.body.email,
	})
		.save()
		.then(function(savedUser){
			res.json({ savedUser })
		})
};

exports.read = function(req, res){
	User
		.where('id', req.params.id)
		.fetch()
		.then(function(user){
			res.json({ user })
		});
};

exports.update = function(req, res){
	User
		.where('id', req.params.id)
		.fetch()
		.then(function(user){
			user
				.save({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					emailAddress: req.body.emailAddress,
				})
				.then(function(saved) {
					res.json({ saved })
				});
		});
};

exports.delete = function(req, res){
	User
		.where('id', req.params.id)
		.destroy()
		.then(function(destroyed){
			res.json({ destroyed });
		});
};