class UsersStorage {
	constructor() {
		this.id = 0;
		this.storage = {};
	}

	addUser({ firstName, lastName, email, age=undefined, bio=undefined }) {
		const id = this.id
		this.storage[id] = { id, firstName, lastName, email, age, bio };
		this.id++;
	}

	getUsers() {
		return Object.values(this.storage);
	}

	getUser(id) {
		return this.storage[id];
	}

	updateUser(id, { firstName, lastName }) {
		this.storage[id] = { id, firstName, lastName, email, age, bio };
	}

	deleteUser(id) {
		delete this.storage[id];
	}
}

module.exports = new UsersStorage();