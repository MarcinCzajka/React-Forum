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
        const component = this.state.posts.map(item => {
            if(item.shouldPostRender === false) return "";
            return <ForumPost postId={item.id} key={item.key} removePostFromState={this.removePostFromState}></ForumPost>
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
            let i = 0;
            const array = res.data.map(item => {
                i++;
                return {id: item._id, key: "ForumPost"+i, shouldPostRender: true};
            });

            this.setState({posts: array});
        });
    };

    removePostFromState(id) {
        const posts = this.state.posts.slice();
        let index = posts.findIndex(item => {
          return item.id === id;
        });
        if (index !== -1) {
            posts[index].shouldPostRender = false;
            this.setState({
                posts: posts
            });
        }
      }

}

export default ForumPostGroup;