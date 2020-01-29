import React from 'react';
import { Comment } from "semantic-ui-react";
import PostComment from './comment/PostComment';
import UserContext from '../../../contexts/UserContext';
import { fetchResponseComments, removeCommentById, replyToComment } from './getComments';
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

	static contextType = UserContext;
	
	componentDidMount() {
		this.getComments();
	};

	getComments = () => {
		fetchResponseComments(this.state.parentId, this.state.mongoSorting)
			.then(res => {
				this.setState({comments: res.data});
			});
	};

	handleReply = (roomId, content, responseTo) => {
		replyToComment(this.context.userId, roomId, content, responseTo)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err);
			})
	}

	removeComment = id => {
		removeCommentById(id) 
			.then(res => {
				//When successfull - fetch comments again
				this.getComments();
			})
			.catch(err => {
				console.log(err)
			})
	}
	
	render() {
        const comments = this.state.comments.map(item => {
			return <PostComment 
						postId={item._id}
						key={item._id}
						authorId={item.authorId}
						content={item.content}
						date={item.date}
						responseTo={item.responseTo}
						roomId={item.roomId}
						className="comment"
						handleReply={this.handleReply}
						removeComment={this.removeComment}
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