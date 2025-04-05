const pool = require("./pool");
const { NotFoundError } = require('../errors/errors');

async function getPosts() {
	const { rows } = await pool.query("SELECT * FROM posts");
	return rows;
}

async function getPost(id) {
	const result = await pool.query(
		`
		SELECT 
			posts.id,
			posts.movie,
			posts.director,
			posts.poster,
			posts.releasedate,
			posts.review,
			posts.rating,
			posts.datewatched,
			posts.author,
			COALESCE(json_agg(
				json_build_object(
					'id', comments.id,
					'postId', comments.post_id,
					'text', comments.text,
					'time', comments.timecreated,
					'author', comments.author
				)
			) FILTER (WHERE comments.id IS NOT NULL), '[]') AS comments
		FROM posts
		LEFT JOIN comments ON posts.id = comments.post_id
		WHERE posts.id = $1
		GROUP BY posts.id
		`
		, [id]);
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
	datewatched,
	author,
) {
	const result = await pool.query(
		`INSERT INTO posts 
		(movie, director, poster, releaseDate, review, rating, datewatched, author)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING *`
		, [movie, director, poster, releaseDate, review, rating, datewatched, author]
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
	dateWatched,
	author,
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
		    datewatched = $8,
			author = $9
		WHERE id = $1 
		RETURNING *
		`
		,[id, movie, director, poster, releaseDate, review, rating, dateWatched, author]
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

async function addComment(postId, text, time, author) {
	const result = await pool.query(
		`
		INSERT INTO comments (post_id, text, timeCreated, author) 
		VALUES ($1, $2, $3, $4) 
		RETURNING *`,
		[postId, text, time, author]
	);
	
	return result.rows[0];
}

async function deleteComment(commentId) {
	const result = await pool.query(
		"DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);
	if (result.rowCount == 0) {
		throw new NotFoundError("Comment", id);
	}
	return result.rows[0];
}

async function getUser(username) {
	const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
	return rows;
}

async function checkEmail(email) {
	const { rows } = await pool.query("SELECT count(username) FROM users WHERE email = $1", [email]);
	return rows[0].count;
}

async function addUser(username, password, email) {
	const result = await pool.query(
		`
		INSERT INTO users (username, password, email)
		VALUES ($1, $2, $3)
		RETURNING *
		`
		, [username, password, email]
	);
	return result;
}

async function deleteUser(username) {
	const { rowCount } = await pool.query(
		`DELETE FROM users WHERE username = $1 RETURNING *`, [username]
	);

	if (rowCount == 0) {
		throw new NotFoundError("User", username);
	}
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
	checkEmail,
	addUser,
	deleteUser,
};