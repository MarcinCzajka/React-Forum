import React from 'react';
import { Comment } from "semantic-ui-react";
import PostComment from './comment/PostComment';
import UserContext from '../../../contexts/UserContext';
import { fetchResponseComments, removeCommentById, replyToComment } from './getComments';
import getUserDetails from './getUserDetails';
import './CommentGroup.css';

class CommentGroup extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			parentId: this.props.parentId,
			mongoSorting: this.props.sorting,
			comments: [],
			authors: []
		}
	}

	static contextType = UserContext;
	
	componentDidMount() {
		this.getComments();
	}

	getComments = () => {
		fetchResponseComments(this.state.parentId, this.state.mongoSorting)
			.then(res => {
				const comments = res.data.map(item => {
					this.getAuthor(item.authorId);

					return item
				});

				this.setState({comments: comments});
			})
	}

	getAuthor = (id) => {
		if(this.state.authors.find(author => author.id === id)) return;

		let result = {};

		getUserDetails(id)
			.then(res => {
				result = {
					id: id,
					authorNick: res.data.name,
					avatar: res.data.avatar
				};
			})
			.catch(err => {
				result = {
					id: id,
					authorNick: 'Deleted user.',
				};
			})
			.finally(() => {
				const { authors } = this.state;
				if(authors.find(author => author.id === id)) return;

				authors.push(result);

				this.setState({authors: authors});
			})
	}

	handleReply = (roomId, content, responseTo) => {
		replyToComment(this.context.userId, roomId, content, responseTo)
	}

	removeComment = id => {
		removeCommentById(id) 
			.then(res => {
				//When successfull - fetch comments again
				this.getComments();
			})
	}
	
	render() {
        const comments = this.state.comments.map(item => {
			const author = this.state.authors.find(author => author.id === item.authorId);

			return <PostComment 
						showPlaceholder={!author ? true : false}
						postId={item._id}
						key={item._id}
						authorId={item.authorId}
						content={item.content}
						date={item.date}
						responseTo={item.responseTo}
						roomId={item.roomId}
						authorNick={(author ? author.authorNick : '')}
						avatar={(author ? author.avatar : '')}
						userId={this.context.userId}
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