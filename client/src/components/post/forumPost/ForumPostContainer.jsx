import React from 'react';
import PropTypes from 'prop-types';
import { Message } from "semantic-ui-react";
import UserContext from '../../../contexts/UserContext';
import ForumPostPlaceholder from '../../placeholders/ForumPostPlaceholder';
import ForumPost from './layout/ForumPost';
import { getForumPost, 
		 getPostAuthor,
		 getCommentsCount,
		 upvoteForumPost } from './forumPostLogic/forumPostApi';

class ForumPostContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			_id: this.props._id,
			isLikedByUser: false,
			replyContent: '',
			commentsCount: 0,
			isDownloaded: false,
			isLoading: true,
			errorMsg: ''
		}

		this.imageModalRef = React.createRef();
	}

	static contextType = UserContext;

	componentDidMount() {
		if(!this.state._id) this.removeMeFromList();

		this.getPostDetails();
		this.getNrOfComments();
	}

	getPostDetails = () => {
		getForumPost(this.state._id)
			.then(res => {
				this.setState({
					authorId: res.authorId,
					category: res.category,
					creationDate: res.creationDate,
					description: res.description,
					image: res.image,
					lastActivityDate: res.lastActivityDate,
					title: res.title,
					upvotes: res.upvotes,
					views: res.views,
					isDownloaded: true
				});

				this.getPostAuthorDetails();
				this.getNrOfComments();
			})
	}

	getPostAuthorDetails = () => {
		getPostAuthor(this.state.authorId)
			.then(res => {
				this.setState({
					authorNick: res.name || "",
					avatar: res.avatar || ""
				});
			})
			.catch(err => {
				this.setState({
					authorNick: "Deleted user."
				});
			})
	}

	getNrOfComments = () => {
		getCommentsCount(this.state._id)
			.then(commentsCount => {
				if(commentsCount > 0) {
					this.setState({commentsCount: commentsCount});
				}

				if(this.props.setReady) this.props.setReady(Boolean(commentsCount));
			})
	}

	handleImageLoaded = () => {
		this.setState({ isLoading: false });
		if(this.props.setReady) this.props.setReady(Boolean(this.state.commentsCount));
	}

	updateUpvote = () => {
		if(!this.context.loggedIn) return this.setState({
			errorMsg: <p>You must <span className='asLink' onClick={this.context.showLogin}>login</span> before you can vote!</p>
		});

		upvoteForumPost(this.state._id)
			.then(res => {
				this.setState({upvotes: res.upvotes, isLikedByUser: res.liked});
			})
			.catch(err => {
				this.setState({errorMsg: err})
			})
	}

	handleReplyBtnClick = () => {
		if(!this.context.loggedIn) return this.setState({
			errorMsg: <p>You must <span className='asLink' onClick={this.context.showLogin}>login</span> before you can post response!</p>
		});

		if(this.state.replyContent) {
			this.handleReplyToPost();
		} else {
			this.setState({showReplyForm: !this.state.showReplyForm, replyContent: ''});
		}
	}
	
	showImageModal = () => {
		this.imageModalRef.current.open();
	}

	removeMeFromList = () => {
		//Function to be used in case Image is no longer available
		this.props.removeForumPost(this.state._id);
	}
	
	render() {
		const {_id, creationDate, isLoading, isDownloaded, image, title, description, authorNick = '', commentsCount, views, isLikedByUser, upvotes } = this.state;

		return (
			<article className='roomContainer'>

				{isLoading ? <ForumPostPlaceholder /> : ''} 
				
				{isDownloaded ? (
					<ForumPost 
						isLoading={isLoading}
						_id={_id}
						image={image}
						handleImageLoaded={this.handleImageLoaded}
						title={title}
						description={description}
						imageModalRef={this.imageModalRef}
						showImageModal={this.showImageModal}
						authorNick={authorNick}
						creationDate={creationDate}
						commentsCount={commentsCount}
						views={views}
						upvotes={upvotes}
						isLikedByUser={isLikedByUser}
						updateUpvote={this.updateUpvote}
						removePost={this.removeMeFromList}
					/>
				) : ''}

				{this.state.errorMsg && !this.context.loggedIn ? (
					<Message warning attached='bottom'>
						<Message.Header>{this.state.errorMsg}</Message.Header>
					</Message>
				) : ''}

			</article>
		)
	}
}

ForumPostContainer.propTypes = {
	_id: PropTypes.string.isRequired,
	setReady: PropTypes.func
}

export default ForumPostContainer;