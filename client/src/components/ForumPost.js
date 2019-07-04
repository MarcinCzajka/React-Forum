import React from 'react';
import basePath from '../api/basePath';
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Header, Modal } from "semantic-ui-react";

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
			<container>
				<header>{this.state.date}{this.state.authorId}</header>
				{this.state.content}
			</container>
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