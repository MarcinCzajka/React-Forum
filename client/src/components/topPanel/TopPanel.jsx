import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "semantic-ui-react";
import LoginFormContainer from "../login/LoginFormContainer";
import SignUpFormContainer from '../signup/SignUpFormContainer';
import { LocaleConsumer } from '../../contexts/LocaleContext';
import { UserConsumer } from '../../contexts/UserContext';
import './TopPanel.css';

export default props => {
    return (
        <LocaleConsumer>
            {locale => (
                <UserConsumer>
                    {context => (

                        <Menu tabular inverted>

                            <Link to=''>
                                <Menu.Item name={locale.feedPageLink} />
                            </Link>

                            {context.loggedIn ? (
                                <Link to='/me'>
                                    <Menu.Item name={locale.aboutMeLink} />
                                </Link>
                                    
                            ) : ''}

                            <Link to='/new'>
                                <Menu.Item name={locale.newPostLink} />
                            </Link>

                            {context.loggedIn ? (
                                <Menu.Item position='right' id='topPanelUsername' className='noHover'>
                                    {context.userName.toUpperCase()}
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