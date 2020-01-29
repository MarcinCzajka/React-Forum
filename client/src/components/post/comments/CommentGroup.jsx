import React from 'react';
import { Comment } from "semantic-ui-react";
import PostComment from './comment/PostComment';
import { fetchResponseComments } from './getComments';
import './CommentGroup.css';

class CommentGroup extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			parentId: this.props.parentId,
			mongoSorting: this.props.sorting,
            comments: []
		};
	}
	
	componentDidMount() {
		this.getChildrenPosts();
	};

	getChildrenPosts = () => {
		fetchResponseComments(this.state.parentId, this.state.mongoSorting)
			.then(res => {
				const arrayOfPosts = res.data.map(item => {
					return {id: item._id, key: item._id};
				});

				this.setState({comments: arrayOfPosts});
			});
	};
	
	render() {
        const comments = this.state.comments.map(item => {
			return <PostComment 
						className="comment"
						postId={item.id}
						roomId={this.props.roomId}
						key={item.key}
					/>
        });

		return (
			<Comment.Group className="recursiveComment">
				{comments}
			</Comment.Group>
		);
	}

};

export default CommentGroup;