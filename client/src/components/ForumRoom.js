import React from 'react';
import basePath from '../api/basePath';
import { Link } from 'react-router-dom';
import { Segment, Comment, Form, Button, Image } from "semantic-ui-react";
import UserContext from '../contexts/UserContext';
import RoomPlaceholder from './placeholders/RoomPlaceholder';
import RoomStatsPanel from './RoomStatsPanel'
import './global.css';
import './ForumRoom.css';

class ForumRoom extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			_id: this.props._id,
			authorId: this.props.authorId,
			creationDate: this.props.creationDate,
			lastActivityDate: this.props.lastActivityDate,
			title: this.props.title,
			shortDescription: this.props.shortDescription,
			description: this.props.description,
			category: this.props.category,
			image: this.props.image,
			colorScheme: this.props.colorScheme,
			upvotes: this.props.upvotes,
			views: this.props.views,
			showReplyForm: false,
			replyContent: '',
			isMounted: false,
			arePropsUpdated: false,
			loading: true
		}
	}

	static contextType = UserContext;

	static getDerivedStateFromProps(props, state) {
		if(!state.arePropsUpdated && state.isMounted) return props;
		return null;
	}

	componentDidMount() {
		this.setState({ isMounted: true });
	}

	handleImageLoaded = () => {
		this.setState({ loading: false });
	}
	
	render() {
		return (
			<div className="ui large roomWidth maxWidth" >
				{this.state.loading ? <RoomPlaceholder /> : ''}
				<Segment.Group style={{display: (this.state.loading ? 'none' : 'block')}}>
					<Segment.Group horizontal>
						<Segment className="noPadding segmentImage">
							<Image size='large' centered className='roomImage' onLoad={this.handleImageLoaded} alt={`${this.state.title}`} src={this.state.image} />
						</Segment>
						<Segment className="noMargin maxWidth">
								<Link to={`/post/${this.state._id}`} >
									<Segment>
										<h3>{this.state.title}</h3>
									</Segment>
								</Link>
							<Segment>
								<Comment.Text as='p' className="text postText">{this.state.shortDescription}</Comment.Text>
								
								<RoomStatsPanel {...this.state} />
							</Segment>	
						</Segment>
					</Segment.Group>
					
					{this.context.loggedIn ? (
						<Button size='mini' onClick={() => {this.setState({showReplyForm: !this.state.showReplyForm})}}>Add response</Button>
					) : ''}
				</Segment.Group>
				{this.state.showReplyForm ? (
					<Form reply>
						<Form.TextArea value={this.state.replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
						<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
					</Form>
				) : ''}
			</div>
			)
		}
	

	handleReplyToPost = () => {
		basePath({
		  method: "post",
		  url: `/api/posts/`,
		  data: {
			  authorId: this.context.userId,
			  content: this.state.replyContent,
			  responseTo: this.state._id
		  },
		  withCredentials: true
	  })
	  .then((res) => {
		if(res.status === 200) {
			this.props.refreshPosts();
			this.setState({replyContent: '', showReplyForm: false});
		}
	  })
	}

	getPostAuthorDetails = () => {
		basePath({
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