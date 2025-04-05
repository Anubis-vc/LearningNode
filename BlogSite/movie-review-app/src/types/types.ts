export interface Post {
	id: number;
	movie: string;
	director: string;
	poster: string;
	releasedate: string;
	review: string;
	rating: number;
	datewatched: string;
	author: string;
}

export interface Comment {
	id: number;
	author:string;
	postId: number;
	text: string;
	time: string; // can this be a datetime instead?
}

export interface User {
	username: string;
	isAdmin: boolean;
}