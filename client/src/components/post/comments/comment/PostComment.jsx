import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment } from "semantic-ui-react";
import CommentGroup from '../CommentGroup';
import CommentToolkit from '../replyForm/CommentToolkit';
import PostPlaceholder from '../../../placeholders/PostPlaceholder';
import AvatarPlaceholder from '../../../placeholders/AvatarPlaceholder';
import { LocaleConsumer } from '../../../../contexts/LocaleContext';
import './PostComment.css';

class PostComment extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			avatarReady: false,
			date: moment(this.props.date)
				.format("MMMM Do YYYY, h:mm:ss")
				.toString()
		}

		/*Function to passed to Toolkit and CommentGroup children 
		to allow Toolkit to append children its sibling CommentGroup */
		this.handleReply = null;
		this.setHandleReply = func => {
			this.handleReply = func;
		}
	}

	onAvatarLoad = () => {
		this.setState({avatarReady: true});
	}
	
	render() {
		return (
			<LocaleConsumer>
				{locale => (
					<div className="ui large comments">

						{this.props.showPlaceholder ? (
							<PostPlaceholder />
						) : (
							<Comment className="comment">

								{!this.state.avatarReady ? (
									<AvatarPlaceholder size='sizePostComment' /> 
								) : ''}

								<Comment.Avatar 
									style={{display:(this.state.avatarReady ? 'block' : 'none')}}
									className="avatar" 
									src={this.props.avatar}
									onLoad={this.onAvatarLoad}>
								</Comment.Avatar>
								
								<Comment.Content>
									<Comment.Author className="author" as='a'>{this.props.authorNick}</Comment.Author>
									<Comment.Metadata className="metadata">
										<span className="date">{this.state.date}</span>
									</Comment.Metadata>
									<Comment.Text as='p' className="text">{this.props.content}</Comment.Text>

								<CommentToolkit 
									postId={this.props.postId}
									roomId={this.props.roomId}
									authorId={this.props.authorId}
									userId={this.props.userId}
									handleReply={this.handleReply}
									removeComment={this.props.removeComment}
								/>
									
								</Comment.Content>
							</Comment>
						)}

						<CommentGroup 
							parentId={this.props.postId}
							setHandleReply={this.setHandleReply}
						/>

					</div>
				)}
			</LocaleConsumer>
		)
	}
}

PostComment.propTypes = {
	date: PropTypes.string.isRequired,
	roomId: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	showPlaceholder: PropTypes.bool,
	authorId: PropTypes.string.isRequired,
	authorNick: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	content: PropTypes.string,
	userId: PropTypes.string,
	replyContent: PropTypes.string,
	handleReply: PropTypes.func.isRequired,
	removeComment: PropTypes.func.isRequired
}

export default PostComment;