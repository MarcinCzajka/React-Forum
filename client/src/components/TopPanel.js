import React from 'react';
import { Link } from 'react-router-dom';
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
                        <Link to=''>
                            <Menu.Item name={context.pages[0]} />
                        </Link>
                        {context.loggedIn ? (
                            <Link to='/me'>
                                <Menu.Item name={context.pages[2]} />
                            </Link>
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