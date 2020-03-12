import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import LoginFormContainer from "./login/LoginFormContainer";
import SignUpFormContainer from './signup/SignUpFormContainer';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { UserConsumer } from '../../contexts/UserContext';
import './TopPanel.scss';

export default props => {
    return (
        <LocaleConsumer>
            {locale => (
                <UserConsumer>
                    {user => (

                        <Menu tabular inverted id='topPanel' className='noMargin'>

                            <Link to=''>
                                <Menu.Item name={locale.feedPageLink} />
                            </Link>

                            {user.loggedIn ? (
                                <Link to='/me'>
                                    <Menu.Item name={locale.aboutMeLink} />
                                </Link>
                                    
                            ) : ''}

                            <Link to='/new'>
                                <Menu.Item name={locale.newPostLink} />
                            </Link>

                            {user.loggedIn ? (
                                <Menu.Item position='right' id='topPanelUsername' className='noHover'>
                                    {user.userName.toUpperCase()}
                                </Menu.Item>
                            ) : ''}

                            <Menu.Menu position='right'>
                                <SignUpFormContainer />
                                <LoginFormContainer />
                            </Menu.Menu>

                        </Menu>

                    )}
                </UserConsumer>
            )}
        </LocaleConsumer>
    )
}