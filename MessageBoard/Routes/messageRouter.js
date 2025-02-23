const { Router } = require("express");
const NotFoundError = require("../Errors/NotFoundError");
const messages = require("../db");

const messageRouter = Router();

messageRouter.get("/:messageId", (req, res) => {
	const { messageId } = req.params;
	const message = messages.find(message => message.id == messageId);

	if (!message) {
		throw new NotFoundError("Message not Found");
	}

	res.render('message', { id: message.id, text: message.text, user: message.user, added: message.added});
});

module.exports = messageRouter;