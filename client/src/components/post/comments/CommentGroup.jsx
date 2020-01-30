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
            comments: []
		}
	}

	static contextType = UserContext;
	
	componentDidMount() {
		this.getComments();
	}

	getComments = () => {
		fetchResponseComments(this.state.parentId, this.state.mongoSorting)
			.then(res => {
				const comments = res.data.map((item, index) => {
					this.getAuthor(item.authorId, index);

					item.showPlaceholder = true;
					return item
				});

				this.setState({comments: comments});
			})
	}

	getAuthor = (id, index) => {
		let authorNick = '';
		let avatar = '';

		getUserDetails(id)
			.then(res => {
				if(res.data.name) authorNick = res.data.name;
				if(res.data.avatar) avatar = res.data.avatar;
			})
			.catch(err => {
				authorNick = 'Deleted user.';
			})
			.finally(() => {
				const commentsWithAuthor = this.state.comments;
					commentsWithAuthor[index].authorNick = authorNick;
					commentsWithAuthor[index].avatar = avatar;
					commentsWithAuthor[index].showPlaceholder = false;

				this.setState({
					comments: commentsWithAuthor
				})
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
			return <PostComment 
						showPlaceholder={item.showPlaceholder}
						postId={item._id}
						key={item._id}
						authorId={item.authorId}
						content={item.content}
						date={item.date}
						responseTo={item.responseTo}
						roomId={item.roomId}
						authorNick={item.authorNick}
						avatar={item.avatar}
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