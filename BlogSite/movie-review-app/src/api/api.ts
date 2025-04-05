// using axios for interceptor feature, otherwise this could be done with fetch
// plus i want practice with the tool
import axios from 'axios'
import { Post } from '../types/types';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
});

// interceptor (cool name) to handle auth errors and redirect
api.interceptors.response.use(
	response => response,
	err => {
		if (err.response?.status === 401) {
			// redirect to login if not logged in
			window.location.href = '/login'
		}
		return Promise.reject(err);
	}
);

// api for login
export const authApi = {
	login: (username: string, password: string) => api.post('/auth/login', { username, password }),
	adminLogin: (username: string, password:string) => api.post('/auth/login', { username, password }),
	register: (username: string, password:string, email:string) => api.post('/auth/newuser', { username, password, email }),
	logout: () => api.get('auth/logout'),
	me: () => axios.get('/auth/logout'),
	// delete requires data field because axios expects payload and auto configures for post
	// does not do the same for delete cause payload not always required
	deleteAccount: (username:string, password:string) => api.delete('/auth/account', { data: { username, password } })
};

// api for posting
export const postsApi = {
	getAllPosts: () => api.get('/api/posts'),
	getUserPosts: (username: string) => api.get(`/api/posts/user/${username}`),
	getPost: (id: number) => api.get(`/api/posts/${id}`),
	// use omit to take a Post without id since it is created on the backend
	createPost: (postData: Omit<Post, 'id'>) => api.post('/api/posts', postData),
	updatePost: (id: number, postData: Omit<Post, 'id'>) => api.put(`/api/posts/${id}`, postData),
	deletePost: (id: number) => api.delete(`/api/posts/${id}`)
};

// api for commenting
export const commentsApi = {
	addComment: (postId: number, text: string, author: string) => {
		const time = new Date().toISOString();
		return api.post('/api/posts/comments', { postId, text, time, author });
	},
	deleteComment: (id: number) => api.delete(`/api/posts/comments/${id}`),
};