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
        const postsTree = this.createComponentTree();

        console.log(postsTree)
        return (
            <Comment.Group>
                {postsTree}
            </Comment.Group>
        );
    }

    createComponentTree() {
        const posts = this.state.posts.slice();
        const postsTree = posts.map(post => {
            if(post.shouldPostRender === false || post.responseTo !== "") return "";
            return <ForumPost 
                postId={post.id} 
                key={post.key} 
                authorId={post.authorId}
                content={post.content}
                responseTo={post.responseTo}
                date={post.date}
                handleReplyToPost={this.handleReplyToPost} 
                removePostFromState={this.removePostFromState}>
            </ForumPost>
        });

        postsTree.map(map => console.log(map))

        return postsTree;
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
                authorId: res.data.authorId || "",
                content: res.data.content || "",
                responseTo: res.data.responseTo,
                date: moment(res.data.date)
                    .format("MMMM Do YYYY, h:mm:ss")
                    .toString(),
                shouldPostRender: true
            });

            this.setState({
                posts: posts
            });
		});
      }

}

export default ForumPostGroup;