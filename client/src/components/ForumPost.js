import React from 'react';
import basePath from '../api/basePath';
import "semantic-ui-css/semantic.min.css";
import { Header, Comment} from "semantic-ui-react";
import moment from "moment";

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.postId,
			authorId: "",
			content: "",
			date: "",
			authorNick: "",
			avatar: ""
		};
	}
	
	componentDidMount() {
		this.getPostDetails();
	}
	
	render() {
		return (
			<Comment size='massive'>
				<Comment.Avatar src={this.state.avatar}></Comment.Avatar>
				<Comment.Content>
					<Comment.Author as='string'>{this.state.authorNick}</Comment.Author>
					<Comment.Metadata>{this.state.date}</Comment.Metadata>
					<Comment.Text>{this.state.content}</Comment.Text>

					<Comment.Actions>
						<a>Reply</a>
					</Comment.Actions>
				</Comment.Content>
			</Comment>
		)
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
			this.getPostAuthor()
		});
	};

	getPostAuthor = async () => {
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