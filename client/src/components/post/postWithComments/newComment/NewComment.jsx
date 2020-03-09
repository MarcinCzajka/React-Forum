import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

const NewComment = props => {
    return (
        <Form reply style={{marginTop: '0.5em'}}>
            <Button 
                circular
                color='teal'
                size='massive'
                icon='comment alternate outline'
                onClick={props.changeReplyFormVisibility}
            />
            <Form.TextArea 
                style={{display: (props.active ? 'block' : 'none'), marginTop: '0.5em'}}
                value={props.replyContent}
                onChange={props.handleReplyChange} />
        </Form>
    )
}

NewComment.defaultProps = {
    replyContent: '',
    active: false
}

NewComment.propTypes = {
    replyContent: PropTypes.string,
    active: PropTypes.bool,
    handleReplyChange: PropTypes.func.isRequired,
    handleReplyToPost: PropTypes.func.isRequired,
    changeReplyFormVisibility: PropTypes.func.isRequired
}

export default NewComment;