import React from 'react';
import basePath from '../api/basePath';
import ForumPost from './ForumPost';

class ChildrenOfPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
            parentId: this.props.parentId,
            posts: []
		};
	}
	
	componentDidMount() {
		this.fetchAllChildrenPosts();
	}
	
	render() {
        const component = this.state.posts.map(item => {
			return <ForumPost 
					postId={item.id}
					key={item.key}
					handleReplyToPost={this.props.handleReplyToPost}
					removePostFromState={this.props.removePostFromState}
					addPostToState={this.props.addPostToState}
					postsNotToRender={this.props.postsNotToRender}>
				</ForumPost>
        });

		return (
			<div>
				{component}
			</div>
		);
	}

	fetchAllChildrenPosts = async () => {
		await basePath({
			method: "get",
			url: `/api/posts/?responseTo=${this.state.parentId}`
		})
		.then(res => {

            const arrayOfPosts = res.data.map(item => {
                return {id: item._id, key: item._id};
            });

            this.setState({posts: arrayOfPosts});

		});
	};

};

export default ChildrenOfPost;