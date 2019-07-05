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

        this.refreshPostsList = this.refreshPostsList.bind(this);
    }

    componentDidMount() {
        this.fetchForumPosts();
    }

    render() {
        const component = this.state.posts.map(item => {
            return <ForumPost postId={item} refreshPostsList={this.refreshPostsList}></ForumPost>
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

    refreshPostsList = () => {
        this.fetchForumPosts();
    };
}

export default ForumPostGroup;