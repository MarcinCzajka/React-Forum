import React from 'react';
import basePath from '../api/basePath';

class Test extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { posts: {1: "hello test"} };
	}
	
	componentDidMount() {
		this.getPosts();
	}
	
	render() {
		return <div>{this.state.posts[1]}</div>
	}


	getPosts = async () => {
		const result = await basePath({
			method: "get",
			url: "/api/posts/"
		})
		.then(res => {
			this.setState({
				posts: res
			});
		});
	}
	
}

export default Test;