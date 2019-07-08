import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import './ForumPost.css';
import PostChildren from './PostChildren';

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.postId,
			authorId: "",
			content: "",
			date: "",
			authorNick: "",
			avatar: "",
			cssVisibility: "hidden",
			replyContent: "",
			childrenPosts: []
		};
	}
	
	componentDidMount() {
		this.getPostDetails();
	}
	
	render() {
		return (
			<div className="ui large comments">
				<Comment className="comment">
					<Comment.Avatar 
						className="avatar" 
						src={this.state.avatar} >
					</Comment.Avatar>

					<Comment.Content>
						<Comment.Author className="author" as='string'>{this.state.authorNick}</Comment.Author>
						<Comment.Metadata className="metadata">
							<span className="date">{this.state.date}</span>
						</Comment.Metadata>
						<Comment.Text className="text">{this.state.content}</Comment.Text>

						<Comment.Actions>
							<Button onClick={this.changeReplyFormVisibility}>Reply</Button>
							<Button onClick={this.removeThisPost}>Delete</Button>
						</Comment.Actions>

						<Form reply className={this.state.cssVisibility}>
							<Form.TextArea value={this.state.replyContent} onChange={e => this.updateReplyContent(e.target.value)} />
							<Button onClick={this.postReply} content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
					</Comment.Content>

				</Comment>
				<PostChildren parentId={this.state.id} handleReplyToPost={this.props.handleReplyToPost} removePostFromState={this.props.removePostFromState}></PostChildren>
			</div>
		);
	}

	changeReplyFormVisibility = () => {
		this.setState({cssVisibility: this.state.cssVisibility === "hidden" ? "shown" : "hidden"});
	}

	updateReplyContent = content => {
		this.setState({replyContent: content});
	};

	postReply = async () => {
		this.props.handleReplyToPost(this.state.id, this.state.replyContent);

		this.changeReplyFormVisibility();
		this.setState({replyContent: ""});
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
			this.getPostAuthorDetails()
		});
	};

	getPostAuthorDetails = async () => {
		await basePath({
			method: "get",
			url: `/api/users/${this.state.authorId}`
		})
		.then(res => {
			this.setState({
				authorNick: res.data.nick || "",
				avatar: res.data.avatar || ""
			});
		});
	};

	removeThisPost = async () => {
		await basePath({
			method: "delete",
			url: `/api/posts/${this.state.id}`
		})
		.then(res => {
			if(res.status === 200){
				this.props.removePostFromState(this.state.id);
			}
		});
	};

};

export default ForumPost;