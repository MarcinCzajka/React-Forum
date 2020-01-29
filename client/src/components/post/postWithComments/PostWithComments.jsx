import React from 'react';
import { Helmet } from "react-helmet";
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPost from '../forumPost/ForumPost';
import CommentGroup from '../comments/CommentGroup';
import getForumPost from '../businessLogic/getForumPost';
import '../comments/CommentGroup.css';
import './PostWithComments.css';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomDetails: {},
        }
    }

    componentDidMount() {
        //Pull id from URI and get ForumPost details
        getForumPost(this.props.match.params.id)
            .then(response => {
                this.setState({roomDetails: {...response, arePropsUpdated: true}})
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const title = `${(this.state.roomDetails.title ? this.state.roomDetails.title + ' - ' : '')}React-forum`;
        
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>

                <Grid centered className='roomGrid'>
                    <Comment.Group className='postGroupContainer'>

                        <ForumPost
                            {...this.state.roomDetails}
                        />

                        <Segment className='initialPost'>
                            <CommentGroup
                                sorting={'{"date":"-1"}'}
                                roomId={this.props.match.params.id}
                                parentId={this.props.match.params.id}
                            />
                        </Segment>
                        
                    </Comment.Group>
                </Grid>
            </>
        )
    }

}

export default PostWithComments;