import React from 'react';
import basePath from '../api/basePath';
import { Comment } from "semantic-ui-react";
import ForumPost from './ForumPost';
import './ChildrenOfPost.css';

class ChildrenOfPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
            parentId: this.props.parentId,
            posts: []
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.refreshChildren !== prevProps.refreshChildren) {
			this.fetchAllChildrenPosts();
		};
	};
	
	componentDidMount() {
		this.fetchAllChildrenPosts();
	};
	
	render() {
        const component = this.state.posts.map(item => {
			return <ForumPost className="comment"
					postId={item.id}
					roomId={this.props.roomId}
					key={item.key}
					removePostFromState={this.props.removePostFromState}
					addPostToState={this.props.addPostToState}
					postsNotToRender={this.props.postsNotToRender}>
				</ForumPost>
        });

		return (
			<Comment.Group className="childrenOfPost">
				{component}
			</Comment.Group>
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