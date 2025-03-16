const pool = require("./pool");
const { NotFoundError } = require('../errors/errors');

async function getPosts() {
	const { rows } = await pool.query("SELECT * FROM posts");
	return rows;
}

async function getPost(id) {
	const result = await pool.query("SELECT * FROM posts WHERE id = ($1)", [id]);
	if (result.rowCount === 0) {
		throw new NotFoundError("Post", id);
	}

	return result.rows;
}

async function addPost(
	movie,
	director,
	poster,
	releaseDate,
	review,
	rating,
	dateWatched,
) {
	const result = await pool.query(
		`INSERT INTO posts 
		(movie, director, poster, releaseDate, review, rating, dateWatched)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING *`
		, [movie, director, poster, releaseDate, review, rating, dateWatched]
	);
	return result.rows[0];
}

async function updatePost(
	id,
	movie,
	director,
	poster,
	releaseDate,
	review,
	rating,
	dateWatched
) {
	const result = await pool.query(
		`
		UPDATE posts
		SET movie = $2, 
			director = $3, 
		    poster = $4, 
		    releaseDate = $5, 
		    review = $6, 
		    rating = $7, 
		    dateWatched = $8 
		WHERE id = $1 
		RETURNING *
		`
		,[id, movie, director, poster, releaseDate, review, rating, dateWatched]
	);

	if (result.rowCount === 0) {
		throw new NotFoundError("Post", id);
	}

	return result.rows[0];
}

async function deletePost(id) {
	const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *"
		, [id]);
	if (result.rowCount === 0) {
		throw new NotFoundError("Post", id);
	}
	return result.rows;
}

async function addComment(postId, username, text, time) {
	const result = await pool.query(
		`
		INSERT INTO comments (post_id, username, text, timeCreated) 
		VALUES ($1, $2, $3, $4) 
		RETURNING *`,
		[postId, username, text, time]
	);
	
	return result.rows[0];
}

async function deleteComment(commentId) {
	const result = await pool.query(
		"DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);
	if (result.rowCount == 0) {
		throw new NotFoundError("Comment", id);
	}
	return result.rows;
}

async function getUser(id) {
	await pool.query("SELECT * FROM users WHERE id = $1", [id]);
}

module.exports = {
	getPosts,
	getPost,
	addPost,
	updatePost,
	deletePost,
	addComment,
	deleteComment,
	getUser,
};