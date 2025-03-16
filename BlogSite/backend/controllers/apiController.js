const db = require("../db/queries");
const { NotFoundError } = require("../errors/errors");

async function getPosts(req, res) {
	const posts = await db.getPosts();
	res.send(posts.map(post => `${post.movie}, ${post.director}, ${post.rating}`).join("\n"));
}

async function getPost(req, res) {
	try {
        const { id } = req.params;
		const post = await db.getPost(Number(id));
		res.send(post);
    } catch (err) {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode).json({ error: err.message });
		}
        res.status(500).json({ error: err.message });
    }
}

async function addPost(req, res) {
	const { 
		movie,
		director,
		poster,
		releaseDate,
		review,
		rating,
		dateWatched,
	} = req.body;
	
	const newPost = await db.addPost(
		movie,
		director,
		poster,
		releaseDate,
		review,
		Number(rating),
		dateWatched,
	);

	res.json({ message: "Post created", newPost: newPost });
}

async function updatePost(req, res) {
	try {
		const { id } = req.params;
		const { 
			movie,
			director,
			poster,
			releaseDate,
			review,
			rating,
			dateWatched,
		} = req.body;

		const updatedPost = await db.updatePost(
			id,
			movie,
			director,
			poster,
			releaseDate,
			review,
			Number(rating),
			dateWatched
		)

		res.json({ message: "Post updated", updatedPost });
	} catch (err) {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode).json({ error: err.message });
		}
		res.status(500).json({ error: err.message });
	}
}

async function deletePost(req, res) {
    const { id } = req.params;

    try {
        const row = await db.deletePost(Number(id));
        res.json({ message: "Post deleted successfully", row });
    } catch (err) {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode).json({ error: err.message });
		}
        res.status(500).json({ error: err.message });
    }
}

async function addComment(req, res) {
	const { 
		postId,
		username,
		text,
		time,
	} = req.body;

	const newComment = await db.addComment(Number(postId), username, text, time);
	res.json({ message: "comment created", newComment });
}

async function deleteComment(req, res) {
	const { id } = req.params;

	try {
		const row = await db.deleteComment(Number(id));
		res.json({ message: "Comment deleted successfully", row });
	} catch (err) {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode).json({ error: err.message });
		}
        res.status(500).json({ error: err.message });
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
}