import React from 'react';
import basePath from '../api/basePath';
<<<<<<< HEAD
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
=======
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import { UserConsumer } from '../contexts/UserContext';

class AboutMe extends React.Component {

    render() {
        return (
            <UserConsumer>
                {context => (
                    <Card style={{display:this.props.display}}>
                        <Image src={context.userAvatar} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{context.userName}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Created at: {context.userCreatedAt}</span>
                            <span>{context.userEmail}</span>
                        </Card.Meta>
                        <Card.Description>
                            {context.userDescription}
                        </Card.Description>
                        </Card.Content>
                    </Card>
                )}
            </UserConsumer>
>>>>>>> 6f37e51039f0081358bb8158f0880b973784fe1c
        )
    }

}

export default AboutMe