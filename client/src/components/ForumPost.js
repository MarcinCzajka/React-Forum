import React from 'react';
import basePath from '../api/basePath';

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.postId,
			authorId: "5d1b9e227d1217155c9ba4fe",
			content: "Hello test post",
			date: "2019-07-03T21:00:06.144Z"
		};
	}
	
	componentDidMount() {
		this.getPosts();
	}
	
	render() {
		return (
			<div>
				{this.state.date}
				{this.state.authorId}
				{this.state.content}
			</div>
		)
	}


	getPosts = async () => {
		await basePath({
			method: "get",
			url: "/api/posts/"
		})
		.then(res => {
			console.log(res)
			this.setState({
				posts: ""
			});
		});
	}
	
	populatePosts = async () => {
		await basePath({
			method: "post",
			url: "/api/posts/",
			data: {
				authorId: "5d1b9e227d1217155c9ba4fe",
				content: "Hello test post"
			}
		})
		.then(res => {
			console.log(res);
		});
	}
	
	
}

export default ForumPost;