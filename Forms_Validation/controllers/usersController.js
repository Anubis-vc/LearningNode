const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "Must only contain letters";
const lengthErr = "Must be between 1 and 15 characters";

const validateUser = [
	body("firstName").trim()
		.isAlpha().withMessage(`First Name: ${alphaErr}`)
		.isLength({ min: 1, max: 15 }).withMessage(`First Name: ${lengthErr}`),
	body("lastName").trim()
		.isAlpha().withMessage(`Last Name: ${alphaErr}`)
		.isLength({ min: 1, max: 15 }).withMessage(`Last Name: ${lengthErr}`),
	body("email").trim()
		.isEmail().withMessage("Must be a valid email"),
	body("age").trim()
		.optional({ values: "falsy" })
		.isInt({ min: 18, max: 120}).withMessage("Must be valid number between 18 and 120"),
	body("bio").trim()
		.optional({ values: 'falsy' })
		.isAlpha().withMessage(`Bio: ${alphaErr}`)
		.isLength({ min: 1, max: 200 }).withMessage(`Must be less than 200 characters`),
];

exports.usersListGet = (req, res) => {
	res.render("index", {
		title: "User list",
		users: usersStorage.getUsers(),
	});
};

exports.usersCreateGet = (req, res) => {
	res.render("createUser", {
		title: "Create User",
	});
};

exports.usersCreatePost = [
	validateUser,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("createUser", {
				title: "Create user",
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.addUser({ firstName, lastName, email, age, bio });
		res.redirect("/");
	}
];

exports.usersUpdateGet = (req, res) => {
	const user = usersStorage.getUser(req.params.id);
	if (!user) {
		return res.status(404).send(`User ${req.params.id} not found`);
	}
	res.render("updateUser", {
		title: "Update user",
		user: user,
	});
};

exports.usersUpdatePost = [
	validateUser,
	(req, res) => {
		const user = usersStorage.getUser(req.params.id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("updateUser", {
				title: "Update user",
				user: user,
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
		res.redirect("/");
	}
];

exports.usersDeletePost = (req, res) => {
	usersStorage.deleteUser(req.params.id);
	res.redirect("/");
};