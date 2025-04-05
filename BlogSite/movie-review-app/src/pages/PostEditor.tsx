import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsApi } from '../api/api';
import { Post } from '../types/types'
import { useAuth } from '../context/AuthContext';

const PostEditor = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate()
	const isEditMode = Boolean(id)
	const { user, isAdmin } = useAuth();

	const [formData, setFormData] = useState<Omit<Post, 'id'>>({
		movie: '',
		director: '',
		poster: '',
		releaseDate: '',
		review: '',
		rating: 0,
		dateWatched: new Date().toISOString().split('T')[0],
		author: user?.username || '',
	});

	const [loading, setLoading] = useState(isEditMode);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchPost = async () => {
			if (!isEditMode) return;
			
			try {
				setLoading(true);
				const response = await postsApi.getPost(Number(id));

				const postAuthor = response.data.author;
				const canEdit = isAdmin || (user && user.username == postAuthor);
				if (!canEdit) {
					setError("You don't have permission to edit this post");
					navigate('/unauthorized');
					return;
				}

				setFormData({
					movie: response.data.movie,
					director: response.data.director,
					poster: response.data.poster,
					releaseDate: response.data.releasedate,
					review: response.data.review,
					rating: response.data.rating,
					dateWatched: response.data.datewatched,
					author: response.data.author,
				});
			}
			catch (err: any) {
				setError(err.response?.data?.error || 'Failed to load post');
			}
			finally {
				setLoading(false)
			}
		};
		fetchPost();
	}, [id, isEditMode, isAdmin, user, navigate])

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: name === 'rating' ? Number(value) : value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');

		if(!isEditMode) {
			formData.author = user?.username || ''
		}

		try {
			if (isEditMode) {
				await postsApi.updatePost(Number(id), formData);
			}
			else {
				await postsApi.createPost(formData);
			}
			if (isAdmin) {
				navigate('/admin');
			} else {
				navigate('/my-posts');
			}
		}
		catch (err: any) {
			setError(err.response?.data?.error || 'Failed to save post, try again later');
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		navigate('/login')
		return null;
	}

	return (
		<div className='post-editor'>
			<h1>{isEditMode ? 'Edit Movie Review' : 'New Movie Review'}</h1>

			{error && <div className='error-message'>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor="movie">Movie Title</label>
					<input
						type="text"
						id="movie"
						name="movie"
						value={formData.movie}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="director">Director</label>
					<input
						type="text"
						id="director"
						name="director"
						value={formData.director}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="poster">Poster URL</label>
					<input
						type="text"
						id="poster"
						name="poster"
						value={formData.poster}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="releaseDate">Release Date</label>
					<input
						type="date"
						id="releaseDate"
						name="releaseDate"
						value={formData.releaseDate}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="dateWatched">Date Watched</label>
					<input
						type="date"
						id="dateWatched"
						name="dateWatched"
						value={formData.dateWatched}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="rating">Rating (1-10)</label>
					<input
						type="number"
						id="rating"
						name="rating"
						min="1"
						max="10"
						value={formData.rating}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor="review">Review</label>
					<textarea
						id="review"
						name="review"
						value={formData.review}
						onChange={handleChange}
						rows={6}
						required
					/>
				</div>

				<div className='form-actions'>
					<button type="submit">{isEditMode ? 'Update Review' : 'Post Review'}</button>
					<button onClick={() => isAdmin ? navigate('/admin') : navigate('/my-posts')}>Cancel</button>
				</div>
			</form>

		</div>
	);
};

export default PostEditor;