import React from 'react';
import moment from 'moment';
import { Comment } from "semantic-ui-react";
import CommentGroup from '../CommentGroup';
import { UserConsumer } from '../../../../contexts/UserContext';
import ReplyForm from '../replyForm/ReplyForm';
import PostPlaceholder from '../../../placeholders/PostPlaceholder';
import AvatarPlaceholder from '../../../placeholders/AvatarPlaceholder';
import './PostComment.css';

class PostComment extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			showPlaceholder: this.props.showPlaceholder,
			id: this.props.postId,
			authorId: this.props.authorId,
			content: this.props.content,
			date: this.props.date,
			responseTo: this.props.responseTo,
			roomId: this.props.roomId,
			authorNick: this.props.authorNick,
			avatar: this.props.avatar,
			avatarReady: false
		}
	}

	static getDerivedStateFromProps(props) {
		const result = {...props};
			result.date = moment(result.date)
			.format("MMMM Do YYYY, h:mm:ss")
			.toString();

		return result
	}

	handleReplyToPost = () => {
		const { id, roomId, replyContent } = this.state;
		
		this.props.handleReply(roomId, replyContent, id)
	}

	onAvatarLoad = () => {
		this.setState({avatarReady: true});
	}
	
	render() {
		const { id,
			roomId,
			avatarReady,
			avatar,
			authorNick,
			date,
			content,
			authorId,
			showPlaceholder } = this.state;
		
		return (
			<UserConsumer>
				<div className="ui large comments">

					{showPlaceholder ? (
						<PostPlaceholder />
					) : (
						<Comment className="comment">

							{!avatarReady ? (
								<AvatarPlaceholder size='sizePostComment' /> 
							) : ''}

							<Comment.Avatar 
								style={{display:(avatarReady ? 'block' : 'none')}}
								className="avatar" 
								src={avatar}
								onLoad={this.onAvatarLoad}>
							</Comment.Avatar>
							
							<Comment.Content>
								<Comment.Author className="author" as='a'>{authorNick}</Comment.Author>
								<Comment.Metadata className="metadata">
									<span className="date">{date}</span>
								</Comment.Metadata>
								<Comment.Text as='p' className="text">{content}</Comment.Text>

							<ReplyForm 
								postId={id}
								roomId={roomId}
								authorId={authorId}
								userId={this.props.userId}
								handleReply={this.props.handleReply} 
							/>
								
							</Comment.Content>
						</Comment>
					)}

					<CommentGroup 
						parentId={id} >
					</CommentGroup>

				</div>
			</UserConsumer>
		);
	}

};

export default PostComment;