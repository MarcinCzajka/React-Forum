import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import './global.css';
import ChildrenOfPost from './ChildrenOfPost';
import UserContext from '../contexts/UserContext';
import PostPlaceholder from './placeholders/PostPlaceholder';
import AvatarPlaceholder from './placeholders/AvatarPlaceholder';
import './ForumPost.css';

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.postId,
			roomId: this.props.roomId,
			authorId: "",
			content: "",
			date: "",
			authorNick: "",
			avatar: "",
			cssVisibility: "hidden",
			replyContent: "",
			refreshChildren: false,
			loading: true,
			avatarReady: false
		}
	}

	static contextType = UserContext;

	refreshChildren() {
		this.setState({
			refreshChildren: !this.state.refreshChildren
		})
	}
	
	componentDidMount() {
		this.getPostDetails();
	}

	onAvatarLoad = () => {
		this.setState({avatarReady: true});
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
								{this.context.userId === this.state.authorId ? <Button size='mini' onClick={this.removeThisPost}>Delete</Button> : ''}
							</Comment.Actions>
						) : ''}
						
							<Form reply className={this.state.cssVisibility}>
								<Form.TextArea value={this.state.replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
								<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
							</Form>
							
						</Comment.Content>

					</Comment>
				)}
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


	handleReplyToPost = async () => {
		await basePath({
		  method: "post",
		  url: `/api/posts/`,
		  data: {
			  authorId: this.context.userId,
			  roomId: this.state.roomId,
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
		}
	  })
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
				authorNick: res.data.name || "",
				avatar: res.data.avatar || "",
				loading: false
			});
		})
		.catch(err => {
			this.setState({
				authorNick: "Deleted user.",
				loading: false
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