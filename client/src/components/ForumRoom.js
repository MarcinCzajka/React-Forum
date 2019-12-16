import React from 'react';
import basePath from '../api/basePath';
import { Link } from 'react-router-dom';
import { Form, Button, Statistic, Icon} from "semantic-ui-react";
import UserContext from '../contexts/UserContext';
import RoomPlaceholder from './placeholders/RoomPlaceholder';
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
			<article className='roomContainer'>
				<div>
					{this.state.loading ? <RoomPlaceholder /> : ''}

					<div className='roomGrid noMargin noPadding' style={{display: (this.state.loading ? 'none' : 'grid')}}>
						<div className='roomImageContainer'>
							<img className='roomImage' onLoad={this.handleImageLoaded} src={this.state.image} alt={this.state.title} />
						</div>

						<header className='roomTitle'>
							<Link to={`/post/${this.state._id}`}>
								<h3>{this.state.title}</h3>
							</Link>
						</header>

						<main className='roomDescription'>
							<p>{this.state.shortDescription}</p>
						</main>

						<footer className='roomFooter'>
							<Statistic.Group size='mini' className='maxWidth roomStats noMargin'>
								<Statistic className='roomStat'>
									<Statistic.Value><Icon name='eye'/>  {this.state.views}</Statistic.Value>
								</Statistic>
								
								<Statistic className='roomStat' style={{cursor:'pointer'}}>
									<Statistic.Value><Icon name='thumbs up' style={{color:'green'}} />  {this.state.upvotes}</Statistic.Value>
								</Statistic>
							</Statistic.Group>
						</footer>

						{this.context.loggedIn ? (
							<Button size='mini' onClick={() => {this.setState({showReplyForm: !this.state.showReplyForm})}}>Add response</Button>
						) : ''}
					</div>

					{this.state.showReplyForm ? (
						<Form reply>
							<Form.TextArea value={this.state.replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
							<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
						</Form>
					) : ''}
				</div>
			</article>
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