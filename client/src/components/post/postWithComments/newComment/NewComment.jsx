import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import AvatarPlaceholder from '../../../placeholders/AvatarPlaceholder';
import { LocaleConsumer } from '../../../../contexts/LocaleContext';
import './NewComment.scss';

class NewComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {avatarReady: false};
    }

    handleAvatarLoaded = () => {
        this.setState({avatarReady: true});
    }

    listenForEnterKey = ({keyCode, shiftKey}) => {
        if(keyCode === 13 && !shiftKey) this.props.handleReplyToPost();
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
                                placeholder={locale.forumPost.newCommentPrompt}
                                value={this.props.replyContent}
                                onChange={this.props.handleReplyChange}
                                onKeyPress={this.listenForEnterKey}>
                            </textarea>

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