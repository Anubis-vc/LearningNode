import { useNavigate } from "react-router-dom";
import { Post } from "../types/types";
import { useEffect, useState } from "react";
import { postsApi } from "../api/api";

const Home = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<Post[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await postsApi.getAllPosts();
				setPosts(response.data);
			}
			catch (err){
				console.error("Failed to set posts:", err);
				setError("Failed to load posts, please try again later");
			}
			setLoading(false);
		}
		fetchPosts();
	}, []);

	if (loading) return <div className="flex justify-center items-center h-screen">Loading posts...</div>;
	if (error) return <div className="text-red-500 text-center">{error}</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Movie Reviews</h1>

			{posts.length === 0 ? (
				<p>No posts found.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{posts.map((post) => (
						<div
							key={post.id}
							className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
							onClick={() => navigate(`/post/${post.id}`)}
						>
							{post.poster ? (
								<img
									src={post.poster}
									alt={`${post.movie} poster`}
									className="w-full h-64 object-cover"
								/>
							) : (
								<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
									<span className="text-gray-500">No poster</span>
								</div>
							)}

							<div className="p-4">
								<h2 className="text-xl font-semibold">{post.movie}</h2>
								<p className="text-sm text-gray-600">Directed by {post.director}</p>
								<p className="text-sm text-gray-600">Released: {new Date(post.releasedate).toLocaleDateString()}</p>
								<div className="flex justify-between items-center mt-2">
									<span className="text-sm text-gray-600">Rating: {post.rating}/10</span>
									<span className="text-sm text-gray-600">By {post.author}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;