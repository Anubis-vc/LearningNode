export interface Post {
	id: number;
	movie: string;
	director: string;
	poster: string;
	releaseDate: string;
	review: string;
	rating: number;
	dateWatched: string;
}

export interface Comment {
	id: number;
	postId: number;
	username: string;
	text: string;
	time: string; // can this be a datetime instead?
}

export interface User {
	username: string;
	isAdmin: boolean;
}