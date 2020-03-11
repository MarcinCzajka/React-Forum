import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import './NewComment.scss';

const NewComment = props => {
    return (
        <Form className='newCommentForm' reply>
            <Button 
                circular
                color='teal'
                size='massive'
                icon='comment alternate outline'
                onClick={props.changeReplyFormVisibility}
            />

            {props.active ? (
                <>
                    <Form.TextArea 
                        style={{marginTop: '0.5em'}}
                        value={props.replyContent}
                        onChange={props.handleReplyChange}
                    />

                    <Button 
                        onClick={props.handleReplyBtnClick}
                    />
                </>
            ) : ''}
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
    handleReplyBtnClick: PropTypes.func.isRequired,
    changeReplyFormVisibility: PropTypes.func.isRequired
}

export default NewComment;