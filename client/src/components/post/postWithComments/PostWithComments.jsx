import React from 'react';
import { Helmet } from "react-helmet";
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPost from '../forumPost/ForumPost';
import RecursiveComment from '../comment/recursiveComment/RecursiveComment';
import getForumPost from '../businessLogic/getForumPost';
import '../comment/recursiveComment/RecursiveComment.css';
import './PostWithComments.css';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomDetails: {},
            comments: [],
            commentsNotToRender: [],
            refreshChildren: false
        }
    }

    componentDidMount() {
        //get id from URI and get ForumPost details
        getForumPost(this.props.match.params.id)
            .then(response => {
                this.setState({roomDetails: {...response, arePropsUpdated: true}})
            })
            .catch(err => {
                console.log(err);
            })

    }

    removeCommentFromState = (id) => {
        const comments = this.state.comments.filter(item => item.id !== id);

        const commentsNotToRender = this.state.commentsNotToRender.slice();
        if(commentsNotToRender.indexOf(id) === -1) commentsNotToRender.push(id)

        this.setState({
            comments: comments,
            commentsNotToRender: commentsNotToRender
        })
    }

    addCommentToState = (id) => {
        const comments = this.state.comments.slice();
        const index = comments.findIndex(item => {
            return item.id === id;
        });

        if (index === -1) {
            comments.push({
                id: id,
                key: id,
                shouldPostRender: true
            });

            this.setState({
                comments: comments
            });
        }
    }

    refreshChildren = () => {
        this.setState({refreshChildren: !this.state.refreshChildren});
    }

    render() {
        const title = `${this.state.roomDetails.title || ''}${this.state.roomDetails.title ? ' - ' : ''}React-forum`;
        
        return (
            <>
                <Helmet>
                    <title>{title}</title>
                </Helmet>

                <Grid centered className='roomGrid'>
                    <Comment.Group className='postGroupContainer'>
                        <ForumPost
                            showResponseButton={true}
                            className='roomInPostsGroup'
                            refreshPosts={this.refreshChildren}
                            {...this.state.roomDetails}
                        />
                        <Segment className='initialPost'>
                            <RecursiveComment
                                sorting={'{"date":"-1"}'}
                                roomId={this.props.match.params.id}
                                parentId={this.props.match.params.id}
                                refreshChildren={this.state.refreshChildren}
                                removeCommentFromState={this.removeCommentFromState} 
                                addCommentToState={this.addCommentToState}
                                commentsNotToRender={this.state.commentsNotToRender}>
                            </RecursiveComment>
                        </Segment>
                    </Comment.Group>
                </Grid>
            </>
        )
    }

}

export default PostWithComments;