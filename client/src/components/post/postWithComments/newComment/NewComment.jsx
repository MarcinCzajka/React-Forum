import React from 'react';
import PropTypes from 'prop-types';
import { Comment, Button } from 'semantic-ui-react';
import AvatarPlaceholder from '../../../placeholders/AvatarPlaceholder';
import { LocaleConsumer } from '../../../../contexts/LocaleContext';
import './NewComment.scss';

class NewComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {avatarReady: false, showButtonContainer: false};
    }

    handleAvatarLoaded = () => {
        this.setState({avatarReady: true});
    }

    showButtonContainer = () => {
        this.setState({showButtonContainer: true});
    }

    handleCancelClick = () => {
        this.props.handleReplyChange('');
        this.setState({showButtonContainer: false});
    }

    render() {
        return (
            <LocaleConsumer>
                {locale => (
                    <div className="ui large comments newCommentContainer">

                        <Comment className="comment">

                            {!this.state.avatarReady ? (
                                <AvatarPlaceholder size='sizePostComment' /> 
                            ) : ''}

                            <Comment.Avatar 
                                style={{display:(this.state.avatarReady ? 'block' : 'none')}}
                                className="avatar" 
                                src={this.props.userAvatar}
                                onLoad={this.handleAvatarLoaded}>
                            </Comment.Avatar>
                            <div className='pseudoLoggedIn'></div>

                            <textarea 
                                placeholder={locale.postWithComment.textareaPlaceholder}
                                value={this.props.replyContent}
                                onChange={({target}) => this.props.handleReplyChange(target.value)}
                                onFocus={this.showButtonContainer}>
                            </textarea>

                            {this.state.showButtonContainer ? (
                                <div className='buttonContainer'>

                                    <Button 
                                        compact
                                        floated='right'
                                        basic={this.props.replyContent ? false : true}
                                        color={this.props.replyContent ? 'teal' : 'grey'}
                                        content={locale.postWithComment.commentButton} 
                                        onClick={this.props.handleReplyToPost}
                                    />

                                    <Button 
                                        compact
                                        basic
                                        floated='right'
                                        content={locale.postWithComment.cancelButton} 
                                        onClick={this.handleCancelClick}
                                    />

                                </div>
                            ) : ''}

                        </Comment>
                    </div>
                )}
            </LocaleConsumer>
        )
    }

}

NewComment.defaultProps = {
    replyContent: ''
}

NewComment.propTypes = {
    userAvatar: PropTypes.string,
    replyContent: PropTypes.string,
    handleReplyChange: PropTypes.func.isRequired,
    handleReplyToPost: PropTypes.func.isRequired
}

export default NewComment;