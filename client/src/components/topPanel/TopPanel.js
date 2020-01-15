import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';
import { UserConsumer } from '../contexts/UserContext';
import './TopPanel.css';

class TopPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: false };
    }

    handleLogin = (e) => {
        this.setState({
            loggedIn: !this.state.loggedIn
        })
    }

    render() {
        return (
            <UserConsumer>
                {context => (
                    <Menu tabular inverted>
                        <Link to=''>
                            <Menu.Item name={context.pages[0].name} />
                        </Link>
                        {context.loggedIn ? (
                                <Link to='/me'>
                                    <Menu.Item name={context.pages[1].name} />
                                </Link>
                                
                        ) : ''}
                            <Link to='/new'>
                                <Menu.Item name={context.pages[2].name} />
                            </Link>
                        {context.loggedIn ? (
                            <Menu.Item position='right' id='topPanelUsername' className='noHover'>
                                {context.userName.toUpperCase()}
                            </Menu.Item>
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