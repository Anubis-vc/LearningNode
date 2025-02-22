const { Router } = require("express");
const { getBookById, reserveBookById } = require("../Controllers/bookController")

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", getBookById);
bookRouter.get("/:bookId/reserve", reserveBookById);
bookRouter.post("/:bookId/reserve", (req, res) => {
	const { bookId } = req.params
	res.send(`Making post req for: ${bookId}`);
});

module.exports = bookRouter;