import React from 'react';
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPostContainer from './forumPost/ForumPostContainer';
import CommentGroup from './comments/CommentGroup';
import './PostWithComments.css';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forumPostId: this.props.match.params.id
        }
    }

    refreshComments = () => {
        window.location.reload();
    }

    removeForumPost = () => {
        //Function to be used in case Image is no longer available
        window.location = window.location.origin;
    }

    render() {
        const { forumPostId } = this.state;
        return (
            <Grid centered className='roomGrid'>
                <Comment.Group className='postGroupContainer'>

                    <ForumPostContainer
                        _id={forumPostId}
                        refreshComments={this.refreshComments}
                        removeForumPost={this.removeForumPost}
                    />

                    <Segment className='initialPost'>
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