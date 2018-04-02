var User = require('./models/user')

new User({
	emailAddress: 'alabitemitope@gmail.com'
	})
		.save()
		.then(function(newUser){
			console.log(newUser);
	}).catch(function(err){
	console.log(err);
});
