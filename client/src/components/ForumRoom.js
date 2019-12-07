import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import UserContext from '../contexts/UserContext';

class ForumRoom extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.id,
			authorId: this.props.authorId,
			creationDate: this.props.creationDate,
			lastActivityDate: this.props.lastActivityDate,
			shortDescription: this.props.shortDescription,
			description: this.props.description,
			category: this.props.category,
			image: this.props.image,
			colorScheme: this.props.colorScheme
		}
	}

	static contextType = UserContext;
	
	render() {
		return (
			<div className="ui large comments">
				<Comment className="comment">
					<Comment.Avatar 
						className="avatar" 
						src={this.state.image} >
					</Comment.Avatar>

					<Comment.Content>
						<Comment.Author className="author" as='a'>{this.state.authorNick}</Comment.Author>
						<Comment.Metadata className="metadata">
							<span className="date">{this.state.date}</span>
						</Comment.Metadata>
						<Comment.Text as='p' className="text">{this.state.shortDescription}</Comment.Text>
					
						<Form reply style={{display:(this.context.selectedPage === 'Feed' ? 'block' : 'none')}}>
							<Form.TextArea value={this.state.replyContent} onChange={e => this.setState(e.target.value)} />
							<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
						
					</Comment.Content>

				</Comment>
			</div>
		)
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
			});
		})
		.catch(err => {
			this.setState({
				authorNick: "Deleted user.",
				loading: false
			})
		})
	}

}

export default ForumRoom;