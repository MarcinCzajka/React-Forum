import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from "semantic-ui-react";
import ForumPostFooter from './footer/ForumPostFooter';
import ImageModal from '../../../imageModal/ImageModal';
import './ForumPost.scss';

const ForumPost = props => (
	<div className='roomGrid noMargin noPadding'
		style={{visibility: (props.isLoading ? 'hidden' : 'visible'), position: (props.isLoading ? 'absolute' : 'relative')}}
	>

		<div className='roomImageContainer' onClick={props.showImageModal}>
			<img 
				className='roomImage'
				onLoad={props.handleImageLoaded}
				onError={props.removePost}
				src={props.image}
				alt={props.title}
			/>
			<div className='imageOverlay'>
				<Icon name='zoom-in' inverted size='huge' />
			</div>
		</div>

		<header className='roomTitle'>
			<Link to={`/post/${props._id}`}>
				<h4>{props.title}</h4>
			</Link>
		</header>

		<main className='roomDescription'>
			<p>{props.description}</p>
		</main>

		<footer className='roomFooter'>
			<ForumPostFooter 
				_id={props._id}
				authorNick={props.authorNick}
				creationDate={props.creationDate}
				commentsCount={props.commentsCount}
				views={props.views}
				upvotes={props.upvotes}
				isLikedByUser={props.isLikedByUser}
				updateUpvote={props.updateUpvote}
			/>
		</footer>

		<ImageModal image={props.image} alt={props.title} ref={props.imageModalRef} />

	</div>
)

ForumPost.propTypes = {
    _id: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	showImageModal: PropTypes.func.isRequired,
	removePost: PropTypes.func.isRequired
}

export default ForumPost