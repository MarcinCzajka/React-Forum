import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import './ForumPost.css';

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
			cssVisible: "hidden"
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
							<Button onClick={this.showReplyForm}>Reply</Button>
						</Comment.Actions>

						<Form reply className={this.state.cssVisible}>
							<Form.TextArea />
							<Button content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
					</Comment.Content>

				</Comment>
			</div>
		);
	}

	showReplyForm = () => {
		this.setState({cssVisible: this.state.cssVisible === "hidden" ? "shown" : "hidden"});
	}

	postReply = async () => {
		
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
	
}

export default ForumPost;