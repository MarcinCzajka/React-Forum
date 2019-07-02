import React from 'react';
import basePath from '../api/basePath';

class Test extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { posts: "hello test" };
	}
	
	componentDidMount() {
		this.populatePosts();
		this.getPosts();
	}
	
	render() {
		return <div>{this.state.posts}</div>
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

export default Test;