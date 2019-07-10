import React from 'react'
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import './ForumRoom.css';
import ForumPostsGroup from './ForumPostsGroup';

class ForumRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomId: this.props.roomId
        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <ForumPostsGroup />
        );
    };
};

export default ForumRoom;