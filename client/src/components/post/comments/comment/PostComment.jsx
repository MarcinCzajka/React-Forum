import React from 'react';
import moment from 'moment';
import { Comment, Form, Button } from "semantic-ui-react";
import CommentGroup from '../CommentGroup';
import UserContext from '../../../../contexts/UserContext';
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
			date: moment(this.props.date)
				.format("MMMM Do YYYY, h:mm:ss")
				.toString(),
			responseTo: this.props.responseTo,
			roomId: this.props.roomId,
			authorNick: this.props.authorNick,
			avatar: this.props.avatar,
			cssVisibility: "hidden",
			replyContent: "",
			avatarReady: false
		}
	}

	static contextType = UserContext;

	static getDerivedStateFromProps(props, state) {
		return props
	}

	handleReplyToPost = () => {
		const { id, roomId, replyContent } = this.state;
		this.props.handleReply(roomId, replyContent, id)
	}

	onAvatarLoad = () => {
		this.setState({avatarReady: true});
	}
	
	render() {
		const { id, avatarReady, avatar, authorNick, date, content, authorId, cssVisibility, replyContent, showPlaceholder } = this.state;
		
		return (
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

						{this.context.loggedIn ? (
							<Comment.Actions>
								<Button size='mini' onClick={this.changeReplyFormVisibility}>Reply</Button>
								{this.context.userId === authorId ? <Button size='mini' onClick={() => {this.props.removeComment(id)}}>Delete</Button> : ''}
							</Comment.Actions>
						) : ''}
						
							<Form reply className={cssVisibility}>
								<Form.TextArea value={replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
								<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
							</Form>
							
						</Comment.Content>
					</Comment>
				)}

				<CommentGroup 
					parentId={id} >
				</CommentGroup>

			</div>
		);
	}

	changeReplyFormVisibility = () => {
		this.setState({cssVisibility: this.state.cssVisibility === "hidden" ? "shown" : "hidden"});
	}

};

export default PostComment;