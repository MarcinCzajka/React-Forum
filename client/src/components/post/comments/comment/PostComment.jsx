import React from 'react';
import moment from 'moment';
import { Comment } from "semantic-ui-react";
import CommentGroup from '../CommentGroup';
import CommentToolkit from '../replyForm/CommentToolkit';
import PostPlaceholder from '../../../placeholders/PostPlaceholder';
import AvatarPlaceholder from '../../../placeholders/AvatarPlaceholder';
import './PostComment.css';

class PostComment extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			avatar: this.props.avatar,
			avatarReady: false
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

	formattedDate = () => {
		return moment(this.props.date)
			.format("MMMM Do YYYY, h:mm:ss")
			.toString();	
	}
	
	render() {
		return (
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
								<span className="date">{this.formattedDate()}</span>
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
		);
	}

};

export default PostComment;