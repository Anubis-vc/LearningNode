class NotFoundError extends Error {
	constructor(resource, id) {
		super(`${resource} with id ${id} not found.`);
		this.name = "NotFoundError";
		this.statusCode = 404;
	}
}

module.exports = { NotFoundError };