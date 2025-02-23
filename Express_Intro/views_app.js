const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

const links = [
	{ href: "/", text: "Home" },
	{ href: "about", text: "About" },
];
const users = ["Rose", "Cake", "Biff"];

app.get('/about', (req, res) => {
	res.render("index", { links: links, message: "About page", users: users });
});
app.get("/", (req, res) => {
	res.render("index", { links: links, message: "Home Page", users: users });
});

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.listen(PORT, () => {
	console.log(`My first Express app - listening on port ${PORT}!`);
});