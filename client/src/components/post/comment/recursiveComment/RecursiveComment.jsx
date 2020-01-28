import React from 'react';
import basePath from '../../../../api/basePath';
import { Comment } from "semantic-ui-react";
import PostComment from '../PostComment';
import './RecursiveComment.css';

class RecursiveComment extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
            parentId: this.props.parentId,
            comments: []
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.refreshChildren !== prevProps.refreshChildren) {
			this.fetchAllChildrenPosts();
		};
	};
	
	componentDidMount() {
		this.fetchAllChildrenPosts();
	};
	
	render() {
        const comments = this.state.comments.map(item => {
			return <PostComment 
					className="comment"
					postId={item.id}
					roomId={this.props.roomId}
					key={item.key}
					removeCommentFromState={this.props.removeCommentFromState}
					addCommentToState={this.props.addCommentToState}
					commentsNotToRender={this.props.commentsNotToRender}>
				</PostComment>
        });

		return (
			<Comment.Group className="recursiveComment">
				{comments}
			</Comment.Group>
		);
	}

	fetchAllChildrenPosts = async () => {
		const sort = this.props.sorting ? `sort=${this.props.sorting}` : '';
		
		await basePath({
			method: "get",
			url: `/api/posts/?responseTo=${this.state.parentId}&${sort}`
		})
		.then(res => {

            const arrayOfPosts = res.data.map(item => {
                return {id: item._id, key: item._id};
            });

            this.setState({comments: arrayOfPosts});

		});
	};



};

export default RecursiveComment;