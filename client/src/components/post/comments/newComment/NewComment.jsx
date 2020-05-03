import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
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
        const {avatarReady, showButtonContainer } = this.state;

        return (
            <LocaleConsumer>
                {locale => (
                    <div style={{display: this.props.active ? '' : 'none'}} className="ui large comments newCommentContainer">

                        <Comment className="comment">

                            {!avatarReady ? (
                                <AvatarPlaceholder size='sizePostComment' /> 
                            ) : ''}

                            <Comment.Avatar 
                                style={{display:(avatarReady ? 'block' : 'none')}}
                                className="avatar" 
                                src={this.props.userAvatar}
                                onLoad={this.handleAvatarLoaded}>
                            </Comment.Avatar>
                            <div className='pseudoLoggedIn'></div>


                            <textarea 
                                className={showButtonContainer ? 'active' : ''}
                                placeholder={locale.postWithComment.textareaPlaceholder}
                                value={this.props.replyContent}
                                onChange={({target}) => this.props.handleReplyChange(target.value)}
                                onFocus={this.showButtonContainer}>
                            </textarea>


                            <div className={classNames({buttonContainer: true, hiddenButtonContainer: !showButtonContainer})}>

                                <Button 
                                    compact
                                    floated='right'
                                    color='teal'
                                    disabled={!this.props.replyContent}
                                    content={locale.postWithComment.commentButton} 
                                    onClick={this.props.handleReplyToPost}
                                />

                                <Button 
                                    compact
                                    floated='right'
                                    basic
                                    content={locale.postWithComment.cancelButton} 
                                    onClick={this.handleCancelClick}
                                />

                            </div>


                        </Comment>
                    </div>
                )}
            </LocaleConsumer>
        )
    }

}

NewComment.defaultProps = {
    active: true,
    replyContent: ''
}

NewComment.propTypes = {
    active: PropTypes.bool,
    userAvatar: PropTypes.string,
    replyContent: PropTypes.string,
    handleReplyChange: PropTypes.func.isRequired,
    handleReplyToPost: PropTypes.func.isRequired
}

export default NewComment;