import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Button } from "semantic-ui-react";
import NewComment from '../../newComment/NewComment';

class CommentToolkit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            replyContent: '',
            displayTextArea: false
        }
    }

    handleReplyChange = (value) => {
        this.setState({replyContent: value});
    }

    handleReply = () => {
        const { roomId, postId, handleReply } = this.props;

        handleReply(roomId, this.state.replyContent, postId)
            .then(res => {
                this.setState({
                    replyContent: '',
                    displayTextArea: false
                })
            })
    }

    render() {
        const { authorId, userId, postId, removeComment } = this.props;

        return (
            <>
                {this.props.userId ? (
                    <Comment.Actions>
                        <Button size='mini' onClick={() => {this.setState({displayTextArea: true})}}>Reply</Button>
                        {userId === authorId ? <Button size='mini' onClick={() => {removeComment(postId)}}>Delete</Button> : ''}
                    </Comment.Actions>
                ) : ''}
            
                {this.state.displayTextArea ? (
                    <NewComment
                        replyContent={this.state.replyContent}
                        userAvatar={this.context.userAvatar}
                        handleReplyChange={this.handleReplyChange}
                        handleReplyToPost={this.handleReply}
                    />
                ) : ''}
            </>
        )
    }
}

CommentToolkit.propTypes = {
    roomId: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    userAvatar: PropTypes.string,
    userId: PropTypes.string,
    authorId: PropTypes.string.isRequired,
    handleReply: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired
}

export default CommentToolkit