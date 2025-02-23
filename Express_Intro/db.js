const authors = [
	{ id: 1, name: "Bryan" },
	{ id: 2, name: "Christian" },
	{ id: 3, name: "Jason" },
];

const books = [
	{id: 123, name: "Madonna in a Fur Coat", reserved: false },
	{ id: 456, name: "Shantaram", reserved: false },
	{ id: 789, name: "Blood Meridian", reserved: false },
];
  
async function getAuthorById(authorId) {
	return authors.find(author => author.id === authorId);
};

async function getBookById(bookId) {
	return books.find(book => bookId == book.id);
}

async function addBook(bookId, bookName) {
	books.push({ id: bookId, name: bookName, reserved: true });
}
  
module.exports = { getAuthorById, getBookById, addBook };
  