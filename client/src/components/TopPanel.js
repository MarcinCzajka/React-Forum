import React from 'react';
import { Menu } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import { UserConsumer } from '../contexts/UserContext';

class TopPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: false };
    }

    handleLogin = (e) => {
        this.setState({
            loggedIn: !this.state.loggedIn
        });
    }

    render() {
        return (
            <UserConsumer>
                {context => (
                    <Menu tabular inverted>
                        <Menu.Item
                            name='Feed'
                            active={this.props.selectedPage === 'Feed'}
                            onClick={this.props.switchPage}
                        />
                        <Menu.Item
                            name='Selected post'
                            active={this.props.selectedPage === 'Selected post'}
                            onClick={this.props.switchPage}
                        />
                        {context.loggedIn ? (
                            <Menu.Item
                                name='Me'
                                active={this.props.selectedPage === 'Me'}
                                onClick={this.props.switchPage}
                            />
                        ) : ''}
                        <Menu.Menu position='right'>
                            <SignUpForm />
                            <LoginForm />
                        </Menu.Menu>
                    </Menu>
                )}
            </UserConsumer>
        )
    }
}

export default TopPanel;