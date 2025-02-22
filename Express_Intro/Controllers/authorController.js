const db = require("../db");
const CustomNotFoundError = require("../Errors/CustomNotFoundError");
const asyncHandler = require("express-async-handler");

const getAuthorById = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const author = await db.getAuthorById(Number(authorId));

  if (!author) {
    throw new CustomNotFoundError("author not found");
  }

  res.send(`Author Name: ${author.name}`);
});

module.exports = { getAuthorById };
