var express = require("express");
var router = express.Router();

var user_controller = require("./controllers/usersController");

router.get("/", function(req, res, next){
	res.send("Welcome to Handoff")
});


//uer routes
router.get("/users", tokens_controller.all);
router.post("/users/create", tokens_controller.create);
router.post("/users/update", tokens_controller.update);
router.delete("/users/delete", tokens_controller.delete);
router.get("/users/:id", tokens_controller.read);

//error handling
router.use((req, res) => {
	res.status(400).json({
		title: "This route does not exist",
		description: `Could not find the url: '${req.originalUrl}' `
	});
});


router.use((error, req, res, next) => {
	res.status(500).json({
		title: "Something went wrong",
		description: error.message
	});
});

module.exports = router;