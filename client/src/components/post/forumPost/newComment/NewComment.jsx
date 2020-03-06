import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

const NewComment = props => {
    if(props.active) {
        return (
            <Form reply style={{marginTop: '0.5em'}}>
                <Form.TextArea 
                    value={props.replyContent}
                    onChange={props.handleReplyChange} />
            </Form>
        ) 
    } else {
        return '';
    }
}

NewComment.defaultProps = {
    replyContent: '',
    active: false
}

NewComment.propTypes = {
    replyContent: PropTypes.string,
    active: PropTypes.bool,
    handleReplyChange: PropTypes.func.isRequired,
    handleReplyToPost: PropTypes.func.isRequired
}

export default NewComment;