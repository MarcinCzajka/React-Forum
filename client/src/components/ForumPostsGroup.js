import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import './ForumPostsGroup.css';
import ForumPost from './ForumPost';

class ForumPostGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.removePostFromState = this.removePostFromState.bind(this);
    }

    componentDidMount() {
        this.fetchForumPosts();
    }

    render() {
        console.log(this.state.posts)
        const component = this.state.posts.map(item => {
            return <ForumPost postId={item} removePostFromState={this.removePostFromState}></ForumPost>
        });

        return (
            <Comment.Group>
                {component}
            </Comment.Group>
        );
    }

    fetchForumPosts = async () => {
        await basePath({
            method: "get",
            url: `/api/posts/`
        })
        .then(res => {
            const array = res.data.map(item => {
                return item._id;
            });

            this.setState({posts: array});
        });
    };

    removePostFromState(id) {
        const posts = this.state.posts;
        let index = posts.findIndex(item => {
          return item === id;
        });
        if (index !== -1) {
            posts.splice(index, 1);
    
            this.setState({
            posts: posts
            });
        }
      }

}

export default ForumPostGroup;