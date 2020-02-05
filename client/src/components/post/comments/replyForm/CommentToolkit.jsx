import React from 'react';
import { Comment, Form, Button } from "semantic-ui-react";

class CommentToolkit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textAreaContent: '',
            displayTextArea: false
        }
    }

    resetState = () => {
        this.setState({
            textAreaContent: '',
            displayTextArea: false
        })
    }

    handleReply = () => {
        const { roomId, postId } = this.props;

        this.props.handleReply(roomId, this.state.textAreaContent, postId)
            .then(this.resetState)
    }

    render() {
        const { postId, roomId, userId, authorId, removeComment } = this.props;
        return (
            <>
                {this.props.userId ? (
                    <Comment.Actions>
                        <Button size='mini' onClick={() => {this.setState({displayTextArea: true})}}>Reply</Button>
                        {userId === authorId ? <Button size='mini' onClick={() => {removeComment(this.props.postId)}}>Delete</Button> : ''}
                    </Comment.Actions>
                ) : ''}
            
                {this.state.displayTextArea ? (
                    <Form reply>

                        <Form.TextArea 
                            value={this.state.textAreaContent} 
                            onChange={e => this.setState({textAreaContent: e.target.value})} 
                        />

                        <Button
                            onClick={this.handleReply}
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />

                    </Form>
                ) : ''}
            </>
        )
    }


}

export default CommentToolkit