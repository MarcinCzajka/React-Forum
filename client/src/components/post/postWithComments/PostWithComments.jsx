import React from 'react';
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPostContainer from '../forumPost/ForumPostContainer';
import NewComment from './newComment/NewComment';
import CommentGroup from '../comments/CommentGroup';
import UserContext from '../../../contexts/UserContext';
import { replyToForumPost } from '../forumPost/forumPostLogic/forumPostApi';
import './PostWithComments.scss';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forumPostId: this.props.match.params.id,
            forumPostReady: false,
            replyContent: ''
        }

        this.forumPostRef = React.createRef();
    }

	static contextType = UserContext;

	handleReplyChange = (value) => {
		this.setState({replyContent: value});
	}
	
	handleReplyToPost = () => {
		replyToForumPost(this.context.userId, this.state.forumPostId, this.state.replyContent)
			.then(res => {
				if(res.status === 200) {
					this.refreshComments();
				}
			})
	}

    refreshComments = () => {
        window.location.reload();
    }

    removeForumPost = () => {
        //Function to be used in case Image is no longer available
        window.location = window.location.origin;
    }

    render() {
        const { forumPostId, replyContent } = this.state;

        return (
            <Grid centered className='roomGrid'>
                <Comment.Group className='postGroupContainer'>

                    <ForumPostContainer
                        _id={forumPostId}
                        refreshComments={this.refreshComments}
                        removeForumPost={this.removeForumPost}
                        ref={this.forumPostRef}
                    />

                    <Segment className='initialPost neuromorphSegment'>

                        <NewComment
                            replyContent={replyContent}
                            userAvatar={this.context.userAvatar}
                            handleReplyChange={this.handleReplyChange}
                            handleReplyToPost={this.handleReplyToPost}
                        />

                        <CommentGroup
                            sorting={'{"date":"-1"}'}
                            initialPost={true}
                            roomId={forumPostId}
                            parentId={forumPostId}
                        />
                    </Segment>
                    
                </Comment.Group>
            </Grid>
        )
    }

}

export default PostWithComments;