const path = require("path");
const db = require("../db/queries");

async function usersGet(req, res) {
	const usernames = await db.getAllUsernames();
	console.log("Usernames: ", usernames);
	res.send("Usernames: " + usernames.map(user => user.username).join(", "));
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
	newUserPost
  };