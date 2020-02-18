import React from 'react';
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

		this.handleReplyRef = React.createRef();
	}

	handleReplyToPost = () => {
		const { roomId, replyContent, postId } = this.props;
		
		this.handleReplyRef(roomId, replyContent, postId);
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
									handleReply={this.handleReplyToPost}
									removeComment={this.props.removeComment}
								/>
									
								</Comment.Content>
							</Comment>
						)}

						<CommentGroup 
							parentId={this.props.postId} 
							ref={this.handleReplyRef} >
						</CommentGroup>

					</div>
				)}
			</LocaleConsumer>
		);
	}

};

export default PostComment;