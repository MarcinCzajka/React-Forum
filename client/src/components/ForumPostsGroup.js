import React from 'react';
import basePath from '../api/basePath';
import { Comment } from "semantic-ui-react";
import ForumRoom from './ForumRoom';
import ChildrenOfPost from './ChildrenOfPost';
import { UserConsumer } from '../contexts/UserContext';

class ForumPostGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            postsNotToRender: [],
            refreshChildren: false
        }

        this.removePostFromState = this.removePostFromState.bind(this);
        this.addPostToState = this.addPostToState.bind(this);
        this.refreshChildren = this.refreshChildren.bind(this);
    }

    refreshChildren() {
        this.setState({refreshChildren: !this.state.refreshChildren});
    }

    render() {
        return (
            <UserConsumer>
                {context => (
                    context.selectedPage === context.pages[1] ? (
                        <Comment.Group className={`ParentDirectory ${this.props.cssVisibility}`}>
                            <ForumRoom refreshPosts={this.refreshChildren} {...context.selectedRoomData} />
                            <ChildrenOfPost 
                                parentId={context.selectedRoomData.id}
                                refreshChildren={this.state.refreshChildren}
                                removePostFromState={this.removePostFromState} 
                                addPostToState={this.addPostToState}
                                postsNotToRender={this.state.postsNotToRender}>
                            </ChildrenOfPost>
                        </Comment.Group>
                    ) : ''
                )}
            </UserConsumer>
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