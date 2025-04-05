import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsApi, commentsApi } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Post, Comment } from '../types/types';

const MoviePost = () => {
	const { id } = useParams<{ id:string }>();
	const [post, setPost] = useState<Post | null>(null);
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const { user, isAdmin } = useAuth();
	const navigate = useNavigate();

	// check if current user is author of post and can edit it
	const isAuthor = user && post && user.username === post.author;
	const canEdit = isAdmin || isAuthor

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setLoading(true);
				const response = await postsApi.getPost(Number(id)); // have to cast after json
				setPost({
					id: response.data.id,
					movie: response.data.movie,
					director: response.data.director,
					poster: response.data.poster,
					releaseDate: response.data.releasedate,
					review: response.data.review,
					rating: response.data.rating,
					dateWatched: response.data.datewatched,
					author: response.data.author,
				});
				setComments(response.data.comments);

				// TODO: LATER adjust table structure to improve read performance
				// see if comments are better stored with posts since writes and deletes will be rare
				// deletes would be slow this way, maybe avoid them. use jsonb array in posts table
			}
			catch (err:any){
				setError(err.response?.data?.error || 'Failed to load post');
			}
			finally {
				setLoading(false);
			}
		};

		if(id) {
			fetchPost();
		}
	}, [id]);

	const handleDeletePost = async () => {
		if (!canEdit) return;

		try {
			await postsApi.deletePost(Number(id));
			navigate('/');
		}
		catch (err:any) {
			setError(err.response?.data?.error || 'Failed to delete post');
		}
	}

	const handleAddComment = async () => {
		if (!user || !newComment.trim()) return;

		try {
			const response = await commentsApi.addComment(Number(id), newComment, user.username);
			setComments([...comments, response.data.newComment]);
			setNewComment('');
		}
		catch (err:any){
			setError(err.response?.data?.error || 'Failed to add comment');
		}
	};

	const handleDeleteComment = async (commentId: number) => {
		try {
			await commentsApi.deleteComment(commentId);
			setComments(comments.filter(item => item.id !== commentId));
		}
		catch (err:any) {
			setError(err.response?.data?.error || 'Failed to delete comment');
		}
	};

	if(loading) return <div>Loading...</div>;
	if(error) return <div>Error: {error}</div>;
	if (!post) return <div>Post not found</div>;

	return (
		<section className='movie-post'>
			<div className='post-header'>
				<h1>{post.movie}</h1>
				<h2>Directed by {post.director}</h2>
				<p>Posted By: {post.author}</p>
				{post.poster && <img src={post.poster} alt={`${post.movie}`} />}
			</div>

			<div className='post-review'>
				<h3>Review</h3>
				<div className='post-meta'>
					<span>Released: {new Date(post.releaseDate).toLocaleDateString()}</span>
					<span>Watched: {new Date(post.dateWatched).toLocaleDateString()}</span>
					<span>Rating: {post.rating}</span>
				</div>
				<p>{post.review}</p>
			</div>

			{canEdit && (
				<div className='post-controls'>
					<button onClick={() => navigate(`/posts/${id}/edit`)}>Edit Post</button>
					<button onClick={handleDeletePost}>Delete Post</button>
				</div>
			)}

			<div className='comments-block'>
				<h3>Comments</h3>
				{comments.length === 0 ? (
					<p>It's Empty! Be the first to comment</p>
				) : (
					<div className='comments-list'>
						{comments.map(comment => (
							<div key={comment.id} className='comment'>
								<div className='comment-header'>
									<span className='comment-author'>{comment.author}</span>
									<span className='comment-time'>{new Date(comment.time).toLocaleString()}</span>
								</div>
								<p className='comment-text'>{comment.text}</p>
								{(user?.username === comment.author || isAdmin) && (
									<button
										className='delete-comment'
										onClick={() => handleDeleteComment(comment.id)}
									>
										Delete
									</button>
								)}
							</div>
						))}
					</div>
				)}

				{user ? (
					<div className='add-comment'>
						<textarea
							placeholder='Add a comment...'
							value={newComment}
							onChange={e => setNewComment(e.target.value)}
						/>
						<button onClick={handleAddComment}>Add Comment</button>
					</div>
				) : (
					<p className='login-prompt'>
						<a href="/login">Login</a> to leave a comment
					</p>
				)}
			</div>

		</section>
	);
};

export default MoviePost;