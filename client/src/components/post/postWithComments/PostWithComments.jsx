import React from 'react';
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPostContainer from '../forumPost/ForumPostContainer';
import CommentGroup from '../comments/CommentGroup';
import NewComment from './newComment/NewComment';
import UserContext from '../../../contexts/UserContext';
import './PostWithComments.css';import { replyToForumPost } from '../forumPost/forumPostLogic/forumPostApi';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forumPostId: this.props.match.params.id,
            forumPostReady: false,
            areComments: false,
            replyContent: '',
            showReplyForm: false
        }
    }

	static contextType = UserContext;

    setReady = (areComments) => {
        this.setState({forumPostReady: true, areComments: areComments})
    }

	handleReplyChange = (e) => {
		this.setState({replyContent: e.target.value});
	}

	changeReplyFormVisibility = () => {
		this.setState({showReplyForm: !this.state.showReplyForm});
    }
    
    hideReplyForm = () => {
		this.setState({replyContent: '', showReplyForm: false});
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
        const { forumPostId, replyContent, showReplyForm, forumPostReady, areComments } = this.state;
        return (
            <Grid centered className='roomGrid'>
                <Comment.Group className='postGroupContainer'>

                    <ForumPostContainer
                        _id={forumPostId}
                        refreshComments={this.refreshComments}
                        removeForumPost={this.removeForumPost}
                        setReady={this.setReady}
                    />
                    
                    {forumPostReady ? (
                        <NewComment 
                            active={showReplyForm}
                            replyContent={replyContent}
                            handleReplyChange={this.handleReplyChange}
                            handleReplyToPost={this.handleReplyToPost}
                            changeReplyFormVisibility={this.changeReplyFormVisibility}
                        />
                    ) : ''}

                    {areComments ? (
                        <Segment className='initialPost'>
                            <CommentGroup
                                sorting={'{"date":"-1"}'}
                                initialPost={true}
                                roomId={forumPostId}
                                parentId={forumPostId}
                            />
                        </Segment>
                    ) : ''}
                    
                </Comment.Group>
            </Grid>
        )
    }

}

export default PostWithComments;