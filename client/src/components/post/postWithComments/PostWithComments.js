import React from 'react';
import basePath from '../../../api/basePath';
import { Helmet } from "react-helmet";
import { Comment, Grid, Segment } from "semantic-ui-react";
import ForumPost from '../forumPost/ForumPost';
import RecursiveComment from '../comment/recursiveComment/RecursiveComment';
import '../comment/recursiveComment/RecursiveComment.css';
import './PostWithComments.css';

class PostWithComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomDetails: {},
            posts: [],
            postsNotToRender: [],
            refreshChildren: false
        }
    }

    componentDidMount() {
        this.getForumRoom();
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
                                removePostFromState={this.removePostFromState} 
                                addPostToState={this.addPostToState}
                                postsNotToRender={this.state.postsNotToRender}>
                            </RecursiveComment>
                        </Segment>
                    </Comment.Group>
                </Grid>
            </>
        )
    }

    getForumRoom = () => {
        basePath({
            method: "get",
            url: `/api/rooms/${this.props.match.params.id}`
        })
        .then(res => {
            this.setState({roomDetails: {...res.data, ...{arePropsUpdated: true}}})
        })
        .catch(err => {
            console.log(err);
        })
    }

    removePostFromState = (id) => {
        const posts = this.state.posts.slice();
        const postsNotToRender = this.state.postsNotToRender.slice();

        let index = posts.findIndex(item => {
          return item.id === id;
        })

        if (index !== -1) {
            posts.splice(index, 1);
            postsNotToRender.push(id);

            this.setState({
                posts: posts,
                postsNotToRender: postsNotToRender
            })
        }
      }

      addPostToState = (id) => {
        const posts = this.state.posts.slice();
        let index = posts.findIndex(item => {
          return item.id === id;
        });
        if (index === -1) {
            posts.push({
                id: id,
                key: id,
                shouldPostRender: true
            });

            this.setState({
                posts: posts
            });
        }
      }

}

export default PostWithComments;