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

    switchPage = (e) => {
        console.log(e.target.innerText)
        this.props.switchPage(e.target.innerText);
    }

    render() {
        return (
            <UserConsumer>
                {context => (
                    <Menu tabular inverted>
                        <Menu.Item
                            name={context.pages[0]}
                            active={this.props.selectedPage === context.pages[0]}
                            onClick={this.switchPage}
                        />
                        <Menu.Item
                            name={context.pages[1]}
                            active={this.props.selectedPage === context.pages[1]}
                            onClick={this.switchPage}
                        />
                        {context.loggedIn ? (
                            <Menu.Item
                                name={context.pages[2]}
                                active={this.props.selectedPage === context.pages[2]}
                                onClick={this.switchPage}
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