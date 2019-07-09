import React from 'react';
import basePath from '../api/basePath';
import { Comment } from "semantic-ui-react";
import './ForumPostsGroup.css';
import ChildrenOfPost from './ChildrenOfPost';
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
            return <ForumPost postId={item.id} key={item.key} handleReplyToPost={this.handleReplyToPost} removePostFromState={this.removePostFromState}></ForumPost>
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
                return {id: item._id, key: item._id, shouldPostRender: true};
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

      handleReplyToPost = async (replyToId, replyMessage) => {
          await basePath({
			method: "post",
			url: `/api/posts/`,
			data: {
				authorId: "5d1b9e227d1217155c9ba4fe",
				content: replyMessage,
				responseTo: replyToId
			}
		})
		.then((res) => {
            const posts = this.state.posts.slice();
            
            posts.push({
                id: res.data._id,
                key: res.data._id,
                shouldPostRender: true
            });

            this.setState({
                posts: posts
            });
		});
      }

}

export default ForumPostGroup;