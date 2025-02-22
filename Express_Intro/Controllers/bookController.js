const db = require("../db");
const CustomNotFoundError = require("../Errors/CustomNotFoundError");
const asyncHandler = require("express-async-handler");

const getBookById = asyncHandler(async (req, res) => {
	const { bookId } = req.params;
	const book = await db.getBookById(Number(bookId));

	if (!book) {
		throw new CustomNotFoundError;
	}

	res.send(`Book Name: ${book.name}`);
});

const reserveBookById = asyncHandler(async (req, res) => {
	const { bookId } = req.params;
	const book = await db.getBookById(Number(bookId))

	if (!book) {
		throw new CustomNotFoundError
	}

	book.reserved = !book.reserved;
	res.send(`Book ${book.name} is now ${book.reserved ? 'reserved' : 'returned'}`);
});

module.exports = { getBookById, reserveBookById };