import React from 'react';
import basePath from '../api/basePath';
import { Comment } from "semantic-ui-react";
import ChildrenOfPost from './ChildrenOfPost';

class ForumPostGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            postsNotToRender: []
        }

        this.removePostFromState = this.removePostFromState.bind(this);
        this.addPostToState = this.addPostToState.bind(this);
    }

    componentDidMount() {
        this.fetchForumPosts();
    }

    render() {
        console.log(this.state)
        return (
            <Comment.Group className="ParentDirectory">
                <ChildrenOfPost 
                    parentId=""
                    removePostFromState={this.removePostFromState} 
                    addPostToState={this.addPostToState}
                    postsNotToRender={this.state.postsNotToRender}>
                </ChildrenOfPost>
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
                return {id: item._id, key: item._id};
            });

            this.setState({posts: array});
        });
    };

    removePostFromState(id) {
        const posts = this.state.posts.slice();
        const postsNotToRender = this.state.postsNotToRender.slice();

        let index = posts.findIndex(item => {
          return item.id === id;
        });
        if (index !== -1) {
            posts.splice(index, 1);
            postsNotToRender.push(id);

            this.setState({
                posts: posts,
                postsNotToRender: postsNotToRender
            });
        };
      };

      addPostToState(id, content) {
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

export default ForumPostGroup;