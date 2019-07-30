import React from 'react'
import ForumPostsGroup from './ForumPostsGroup';

class ForumRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: this.props.roomId
        };
    };

    render() {
        return (
            <ForumPostsGroup />
        );
    };
};

export default ForumRoom;