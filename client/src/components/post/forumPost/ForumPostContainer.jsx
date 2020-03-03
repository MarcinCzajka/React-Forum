import React from 'react';
import basePath from '../../../api/basePath';
import { Form, Message } from "semantic-ui-react";
import UserContext from '../../../contexts/UserContext';
import ForumPostPlaceholder from '../../placeholders/ForumPostPlaceholder';
import ForumPost from './layout/ForumPost';

class ForumPostContainer extends React.Component {
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
			isLikedByUser: false,
			upvotes: this.props.upvotes,
			views: this.props.views,
			showReplyForm: false,
			replyContent: '',
			arePropsUpdated: false,
			isLoading: true,
			errorMsg: '',
		}

		this.imageModalRef = React.createRef();
	}

	static contextType = UserContext;

	componentDidMount() {
		this.getPostAuthorDetails();
	}

	handleImageLoaded = () => {
		this.getNrOfComments();
		this.setState({ isLoading: false });
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
			this.setState({upvotes: res.data.upvotes, isLikedByUser: res.data.liked});
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

	getNrOfComments = () => {
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
		this.imageModalRef.current.open();
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
		const {_id, creationDate, isLoading, image, title, description, authorNick = '', comments, views, isLikedByUser, upvotes, showReplyForm, replyContent} = this.state;

		return (
			<article className='roomContainer'>
				{isLoading ? <ForumPostPlaceholder /> : ''}

				<ForumPost 
					isLoading={isLoading}
					_id={_id}
					image={image}
					handleImageLoaded={this.handleImageLoaded}
					title={title}
					description={description}
					imageModalRef={this.imageModalRef}
					showImageModal={this.showImageModal}
					removePost={this.killMe}
					authorNick={authorNick}
					creationDate={creationDate}
					comments={comments}
					views={views}
					upvotes={upvotes}
					isLikedByUser={isLikedByUser}
					updateUpvote={this.updateUpvote}
				/>

				{this.showLoginPrompt()}

				
				{showReplyForm ? (
					<Form reply style={{gridColumn:'1/-1'}}>
						<Form.TextArea value={replyContent} onChange={e => this.setState({replyContent: e.target.value})} />
					</Form>
				) : ''}

			</article>
		)
	}
}

export default ForumPostContainer;