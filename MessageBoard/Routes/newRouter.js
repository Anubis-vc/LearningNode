const { Router } = require("express");
const messages = require("../db");

const newRouter = Router();

newRouter.get("/", (req, res) => {
	res.render("form");
});
newRouter.post("/", (req, res) => {
	messages.push({ id: messages.length + 1, text: req.body.text, user: req.body.name, added: new Date() });
	res.redirect("/");
})

module.exports = newRouter;