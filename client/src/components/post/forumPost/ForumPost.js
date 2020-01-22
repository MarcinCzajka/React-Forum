import React from 'react';
import basePath from '../../../api/basePath';
import { Link } from 'react-router-dom';
import { Form, Button, Statistic, Icon, Message } from "semantic-ui-react";
import UserContext from '../../../contexts/UserContext';
import RoomPlaceholder from '../../placeholders/RoomPlaceholder';
import ImageModal from '../../imageModal/ImageModal';
import moment from 'moment';
import './ForumPost.css';

class ForumPost extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			_id: this.props._id,
			authorId: this.props.authorId,
			creationDate: this.props.creationDate,
			lastActivityDate: this.props.lastActivityDate,
			title: this.props.title,
			description: this.props.description,
			category: this.props.category,
			image: this.props.image,
			colorScheme: this.props.colorScheme,
			liked: false,
			upvotes: this.props.upvotes,
			views: this.props.views,
			showReplyForm: false,
			replyContent: '',
			isMounted: false,
			arePropsUpdated: false,
			loading: true,
			errorMsg: '',
			comments: 0,
			showResponseButton: this.props.showResponseButton
		}

		this.imageModal = React.createRef();
	}

	static contextType = UserContext;

	componentDidMount() {
		this.setState({ isMounted: true });
	}

	componentDidUpdate() {
		if(this.state.arePropsUpdated && !this.state.authorNick) {
			this.getPostAuthorDetails();
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		if(state.isMounted) {
			if(!state.arePropsUpdated) return props;
		}
		return null;
	}

	handleImageLoaded = () => {
		this.getNrOfPosts();
		this.setState({ loading: false });
	}

	killMe = () => {
		this.props.removeRoom(this.state._id);
	}

	updateUpvote = (e) => {
		if(!this.context.loggedIn) return this.setState({
			errorMsg: <p>You must <span className='asLink' onClick={this.context.showLogin}>login</span> before you can vote!</p>
		});

		basePath({
			method: "put",
			url: `/api/rooms/${this.state._id}`,
			body: {},
			withCredentials: true
		})
		.then(res => {
			this.setState({upvotes: res.data.upvotes, liked: res.data.liked});
		})
		.catch(err => {
			console.log(err)
		})
	}

	showLoginPrompt = () => {
		if(this.state.errorMsg && !this.context.loggedIn) {
			return (
				<Message warning attached='bottom'>
					<Message.Header>{this.state.errorMsg}</Message.Header>
				</Message>
			)
		}
	}
	
	handleReplyToPost = () => {
		basePath({
		  method: 'POST',
		  url: `/api/posts/`,
		  data: {
			  authorId: this.context.userId,
			  roomId: this.state._id,
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
			method: 'GET',
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
		})
	}

	getNrOfPosts = () => {
        const query = 'room=' + this.state._id;
		basePath({
		  method: "get",
		  url: `/api/posts/responseTo?${query}`,
		  withCredentials: true
      })
      .then(res => {
		  if(res.data.comments > 0) this.setState({comments: res.data.comments})
	  })
	  .catch(err => {
		  console.log(err)
	  })
	}
	
	showImageModal = () => {
		this.imageModal.current.open();
	}

	handleReplyBtnClick = () => {
		if(!this.context.loggedIn) return this.setState({
			errorMsg: <p>You must <span className='asLink' onClick={this.context.showLogin}>login</span> before you can vote!</p>
		});

		if(this.state.replyContent) {
			this.handleReplyToPost();
		} else {
			this.setState({showReplyForm: !this.state.showReplyForm, replyContent: ''});
		}
		
	}
	
	render() {
		const {_id, loading, image, title, description, authorNick = '', comments, views, liked, upvotes, showReplyForm, replyContent, showResponseButton} = this.state;
		const creationDate = moment(this.state.creationDate).format('YYYY-MM-DD');

		return (
			<article className='roomContainer'>
				{loading ? <RoomPlaceholder /> : ''}

				<div className='roomGrid noMargin noPadding' style={{display: (loading ? 'none' : 'grid')}}>

						<div className='roomImageContainer' onClick={this.showImageModal}>
							<img 
								className='roomImage'
								onLoad={this.handleImageLoaded}
								onError={this.killMe}
								src={image}
								alt={title}
							/>
							<div className='imageOverlay'>
								<Icon name='zoom-in' inverted size='huge' />
							</div>
						</div>

					<header className='roomTitle'>
						<Link to={`/post/${_id}`}>
							<h3>{title}</h3>
						</Link>
					</header>

					<main className='roomDescription'>
						<p>{description}</p>
					</main>

					<footer className='roomFooter'>

						<Statistic.Group size='mini' className='maxWidth roomStats noMargin'>
							<Statistic className='leftStatistic'>
								<p>Author: {authorNick}</p>
								<p>Created: {creationDate}</p>
							</Statistic>
							<Statistic className='roomStat'>
								<Statistic.Value>
									<Link to={`/post/${_id}`}>
										<Icon name='comments outline'> {comments}</Icon>
									</Link>
								</Statistic.Value>
							</Statistic>

							<Statistic className='roomStat'>
								<Statistic.Value><Icon name='eye'/>  {views}</Statistic.Value>
							</Statistic>
							

							<Statistic className='roomStat' style={{cursor:'pointer'}} onClick={this.updateUpvote} >
								<Statistic.Value>
									<Icon 
										style={{color:(this.context.loggedIn && liked ? 'green' : '')}} 
										name='thumbs up' />  {upvotes}
								</Statistic.Value>
							</Statistic>
						</Statistic.Group>
					</footer>

					<ImageModal image={image} alt={title} ref={this.imageModal} />

				</div>

				{this.showLoginPrompt()}

				
				{showReplyForm ? (
					<Form reply style={{gridColumn:'1/-1'}}>
						<Form.TextArea value={replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
					</Form>
				) : ''}

				{showResponseButton ? (
					<Button  
						className='createPostBtn'
						style={{marginLeft:'80%'}}
						icon 
						labelPosition='right' 
						color='green' 
						onClick={this.handleReplyBtnClick} >
							{showReplyForm ? 'Submit' : 'Add response'}
							<Icon name='comment alternate outline'></Icon>
					</Button>
				) : ''}

			</article>
			)
		}

}

export default ForumPost;