import React from 'react';
import { Menu } from "semantic-ui-react";
import LoginForm from "./LoginForm";

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
                <Menu.Item
                    name='Me'
                    active={this.props.selectedPage === 'Me'}
                    onClick={this.props.switchPage}
                />
                <Menu.Menu position='right'>
                    <LoginForm />
                </Menu.Menu>
            </Menu>
        )
    }
}

export default TopPanel;