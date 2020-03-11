import React from 'react';
import { Grid } from "semantic-ui-react";
import ForumPostContainer from '../forumPost/ForumPostContainer';
import PostListPagination from './pagination/PostListPagination';
import { getForumPosts } from '../forumPost/forumPostLogic/forumPostApi';
import './PostList.scss';

class PostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forumPosts: [],
            activePage: 1,
            totalPages: 1,
            postsLimit: 5,
            removedPostsCount: 0,

            windowWidth: window.innerWidth
        }
    }

    componentDidMount() {
        this.fetchForumPosts();
        window.addEventListener("resize", this.handleResize);
    }

    handleResize = () => {
        this.setState({windowWidth: window.innerWidth});
    }

    removeForumPostFromState = (key) => {
		//Function to be used in case Image is no longer available
        const forumPosts = this.state.forumPosts.filter(post => {
            return post.key !== key
        })

        const {postsLimit, removedPostsCount} = this.state;
        const totalPages =  Math.ceil((forumPosts.length - (removedPostsCount + 1)) / postsLimit);

        this.setState({forumPosts: forumPosts, removedPostsCount: removedPostsCount +1, totalPages: totalPages})
    }

    changePage = (e, { activePage }) => {
        this.setState({ activePage: activePage });
        this.fetchForumPosts(activePage);
    }

    fetchForumPosts = (pageNr = 1) => {
        const { postsLimit } = this.state;
        
        getForumPosts(pageNr, postsLimit)
            .then(res => {
                const forumPosts = res.rooms.map(item => {
                    return {...item, ...{key: item._id}}
                })

                const totalPages =  Math.ceil(res.totalCount / postsLimit);

                this.setState({forumPosts: forumPosts, totalPages: totalPages});
            })
    }

    render() {
        const forumPosts = this.state.forumPosts.map(room => {
            return (
                <Grid.Row key={room.key} centered>
                    <ForumPostContainer {...room} 
                        removeForumPost={this.removeForumPostFromState}
                    />
                </Grid.Row>
            );
        })

        const paginationProps = {
            activePage: this.state.activePage,
            totalPages: this.state.totalPages,
            windowWidth: this.state.windowWidth,
            changePage: this.changePage
        }
        
        return (
            <Grid id='postList' className='noMargin'>
                <PostListPagination 
                    {...paginationProps}
                />

                {forumPosts}

                <PostListPagination 
                    {...paginationProps}
                />
            </Grid>
        );
    }

}

export default PostList;