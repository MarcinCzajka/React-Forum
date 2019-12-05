import React from 'react';
import basePath from '../api/basePath';
import { Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import UserContext from '../contexts/UserContext';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div style={{display:this.props.display}}>
                me
            </div>
        )
    }

}

export default AboutMe