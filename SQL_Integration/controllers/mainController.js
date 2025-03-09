const path = require("path");
const db = require("../db/queries");

async function usersGet(req, res) {
	const searchQuery = req.query.search || null;
	if (searchQuery) {
		const usernames = await db.searchName(req.query.search);
		console.log("Matching users: ", usernames);
		res.send("Matching users: " + usernames.map(user => user.username).join(", "));
	}
	else {
		const usernames = await db.getAllUsernames();
		console.log("Usernames: ", usernames);
		res.send("Usernames: " + usernames.map(user => user.username).join(", "));
	}
};

async function newUserGet(req, res) {
	res.sendFile(path.join(__dirname, "../public/new_user.html"));
};

async function newUserPost(req, res) {
	const { username } = req.body;
	await db.insertUsername(username);
	res.redirect("/");
};

module.exports = {
	usersGet,
	newUserGet,
	newUserPost,
};