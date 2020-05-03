import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from "semantic-ui-react";
import PostComment from './comment/PostComment';
import UserContext from '../../../contexts/UserContext';
import { replyToComment, 
	removeCommentById, 
	fetchResponseComments } from './commentsLogic/commentsApi';
import getUserDetails from './commentsLogic/getUserDetails';
import './CommentGroup.scss';

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
		if(!this.props.initialPost) this.props.setHandleReply(this.handleReply);

		this.getComments();
	}

	getComments = () => {
		fetchResponseComments(this.state.parentId, this.state.mongoSorting)
		.then(res => {

			const comments = res.data.map(item => {
				this.getAuthor(item.authorId);

				return item;
			})

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
		return new Promise((resolve, reject) => {
			replyToComment(this.context.userId, roomId, content, responseTo)
			.then(res => {
				const comments = this.state.comments;

				comments.push(res.data);
				this.getAuthor(res.data.authorId);
				
				this.setState({comments: comments});
				resolve();
			})
			.catch(err => {
				reject(err);
			})
		})
	}

	removeComment = id => {
		removeCommentById(id) 
			.then(res => {
				const comments = this.state.comments.filter(item => {
					if(item._id === id) return null
					return item
				})
				this.setState({comments: comments});
			})
	}
	
	render() {
        const comments = this.state.comments.map(item => {

			const author = this.state.authors.find(author => author.id === item.authorId);

			return <PostComment
				className="comment"
				showPlaceholder={!author ? true : false}
				postId={item._id}
				key={item._id}
				authorId={item.authorId}
				content={item.content}
				date={item.date}
				responseTo={item.responseTo}
				roomId={this.props.roomId}
				authorNick={(author ? author.authorNick : '')}
				avatar={(author ? author.avatar : '')}
				userId={this.context.userId}
				userAvatar={this.context.userAvatar}
				handleReply={this.handleReply}
				removeComment={this.removeComment}
			/>
		})

		return (
			<Comment.Group className="recursiveComment">
				{comments}
			</Comment.Group>
		)
	}
}

CommentGroup.propTypes = {
	parentId: PropTypes.string.isRequired,
	mongoSorting: PropTypes.string,
	setHandleReply: PropTypes.func,
	initialPost: PropTypes.bool
}

export default CommentGroup;