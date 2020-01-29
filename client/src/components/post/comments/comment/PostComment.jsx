import React from 'react';
import basePath from '../../../../api/basePath';
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
			id: this.props.postId,
			authorId: this.props.authorId,
			content: this.props.content,
			date: this.props.date,
			responseTo: this.props.responseTo,
			roomId: this.props.roomId,
			authorNick: "",
			avatar: "",
			cssVisibility: "hidden",
			replyContent: "",
			loading: true,
			avatarReady: false
		}
	}

	static contextType = UserContext;
	
	componentDidMount() {
		this.getPostAuthorDetails()
	}

	handleReplyToPost = () => {
		const { id, roomId, replyContent } = this.state;
		this.props.handleReply(roomId, replyContent, id)
	}

	onAvatarLoad = () => {
		this.setState({avatarReady: true});
	}
	
	render() {
		const { id } = this.state;
		return (
			<div className="ui large comments">

				{this.state.loading ? (
					<PostPlaceholder />
				) : (

				<Comment className="comment">

					{!this.state.avatarReady ? (
						<AvatarPlaceholder size='sizePostComment' /> 
					) : ''}

					<Comment.Avatar 
						style={{display:(this.state.avatarReady ? 'block' : 'none')}}
						className="avatar" 
						src={this.state.avatar}
						onLoad={this.onAvatarLoad}>
					</Comment.Avatar>
					
					<Comment.Content>
						<Comment.Author className="author" as='a'>{this.state.authorNick}</Comment.Author>
						<Comment.Metadata className="metadata">
							<span className="date">{this.state.date}</span>
						</Comment.Metadata>
						<Comment.Text as='p' className="text">{this.state.content}</Comment.Text>

					{this.context.loggedIn ? (
						<Comment.Actions>
							<Button size='mini' onClick={this.changeReplyFormVisibility}>Reply</Button>
							{this.context.userId === this.state.authorId ? <Button size='mini' onClick={() => {this.props.removeComment(id)}}>Delete</Button> : ''}
						</Comment.Actions>
					) : ''}
					
						<Form reply className={this.state.cssVisibility}>
							<Form.TextArea value={this.state.replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
							<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
						
					</Comment.Content>

				</Comment>
				)}
				<CommentGroup
					parentId={id}
					refreshChildren={this.state.refreshChildren}
					handleReplyToPost={this.handleReplyToPost}
					removeCommentFromState={this.props.removeCommentFromState}
					addCommentToState={this.props.addCommentToState}
					commentsNotToRender={this.props.commentsNotToRender}
				>
				</CommentGroup>
			</div>
		);
	}

	changeReplyFormVisibility = () => {
		this.setState({cssVisibility: this.state.cssVisibility === "hidden" ? "shown" : "hidden"});
	}

	getPostDetails = async () => {
		await basePath({
			method: "get",
			url: `/api/posts/${this.state.id}`
		})
		.then(res => {
			this.setState({
				authorId: res.data.authorId || "",
				content: res.data.content || "",
				date: moment(res.data.date)
					.format("MMMM Do YYYY, h:mm:ss")
					.toString()
			});
		})
		.then(() => {
			
		})
	}

	getPostAuthorDetails = async () => {
		await basePath({
			method: "get",
			url: `/api/users/${this.state.authorId}`
		})
		.then(res => {
			this.setState({
				authorNick: res.data.name || "",
				avatar: res.data.avatar || "",
				loading: false
			})
		})
		.catch(err => {
			this.setState({
				authorNick: "Deleted user.",
				loading: false
			})
		})
	}

};

export default PostComment;