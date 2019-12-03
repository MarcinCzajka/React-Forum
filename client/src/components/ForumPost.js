import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import './ForumPost.css';
import ChildrenOfPost from './ChildrenOfPost';

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.postId,
			authorId: "",
			content: "",
			date: "",
			authorNick: "",
			avatar: "https://docs.appthemes.com/files/2011/08/gravatar-grey.jpg",
			cssVisibility: "hidden",
			replyContent: "",
			refreshChildren: false
		};
	}

	refreshChildren() {
		this.setState({
			refreshChildren: !this.state.refreshChildren
		});
	};
	
	componentDidMount() {
		this.getPostDetails();
	}
	
	render() {
		const postsNotToRender = this.props.postsNotToRender.slice();
		let shouldPostRender = postsNotToRender.findIndex(id => {
          return id === this.state.id;
		});
        if (shouldPostRender !== -1) {
            return "";
		}
		
		return (
			<div className="ui large comments">
				<Comment className="comment">
					<Comment.Avatar 
						className="avatar" 
						src={this.state.avatar} >
					</Comment.Avatar>

					<Comment.Content>
						<Comment.Author className="author" as='a'>{this.state.authorNick}</Comment.Author>
						<Comment.Metadata className="metadata">
							<span className="date">{this.state.date}</span>
						</Comment.Metadata>
						<Comment.Text as='p' className="text">{this.state.content}</Comment.Text>

						<Comment.Actions>
							<Button size='mini' onClick={this.changeReplyFormVisibility}>Reply</Button>
							<Button size='mini' onClick={this.removeThisPost}>Delete</Button>
						</Comment.Actions>

						<Form reply className={this.state.cssVisibility}>
							<Form.TextArea value={this.state.replyContent} onChange={e => this.updateReplyTextboxContent(e.target.value)} />
							<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
					</Comment.Content>

				</Comment>
				<ChildrenOfPost
					parentId={this.state.id}
					refreshChildren={this.state.refreshChildren}
					handleReplyToPost={this.handleReplyToPost}
					removePostFromState={this.props.removePostFromState}
					addPostToState={this.props.addPostToState}
					postsNotToRender={this.props.postsNotToRender}>
				</ChildrenOfPost>
			</div>
		);
	}

	changeReplyFormVisibility = () => {
		this.setState({cssVisibility: this.state.cssVisibility === "hidden" ? "shown" : "hidden"});
	}

	updateReplyTextboxContent = content => {
		this.setState({replyContent: content});
	};


	handleReplyToPost = async (replyToId, replyMessage) => {
		await basePath({
		  method: "post",
		  url: `/api/posts/`,
		  data: {
			  authorId: "5d1b9e227d1217155c9ba4fe",
			  content: this.state.replyContent,
			  responseTo: this.state.id
		  },
		  withCredentials: true
	  })
	  .then((res) => {
		if(res.status === 200) {
			this.refreshChildren();
			this.changeReplyFormVisibility();
			this.setState({replyContent: ""});
		};
	  });
	};

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
				authorNick: res.data.name || "",
				avatar: res.data.avatar || ""
			});
		})
		.catch(err => {
			this.setState({
				authorNick: "Deleted user."
			});
		});
		this.props.addPostToState(this.state.id);
	};

	removeThisPost = async () => {
		await basePath({
			method: "delete",
			url: `/api/posts/${this.state.id}`,
            withCredentials: true
		})
		.then(res => {
			if(res.status === 200){
				this.props.removePostFromState(this.state.id);
			};
		});
	};

};

export default ForumPost;