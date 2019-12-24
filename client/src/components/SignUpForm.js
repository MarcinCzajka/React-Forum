import React from 'react';
import { Message, Button, Form, Modal, Menu } from 'semantic-ui-react';
import basePath from '../api/basePath';
import UserContext from '../contexts/UserContext';
import {UserConsumer} from '../contexts/UserContext';
import Captcha from './Captcha';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'userName': '',
            'email': '',
            'password': '',
            'avatar': '',
            'error': ''
        }
    }

    static contextType = UserContext;

    submit = () => {
        if(!this.initialVerification()) return;
        console.log(this.initialVerification())
        basePath({
            method: 'post',
            url: '/api/users',
            headers: {
                captchaToken: this.state.captchaToken
            },
            data: {
                name: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            if (res.status === 200) {

                this.setState({
                    'open': false,
                    'userName': '',
                    'email': '',
                    'password': '',
                    'avatar': '',
                    'error': ''
                })

                alert('Account created.')
            }
        }).catch(error => {
            console.log(error);
            this.setState({ error: error.response.data });
        });
    }

    error = () => {
        if (this.state.error) {
            return (
                <Message error
                header = 'Error'
                content = {this.state.error} />
            )
        }
    }

    initialVerification = () => {
        if(!this.state.userName) {
            this.setState({error: 'Username is not allowed to be empty.'})
            return false;
        } else if(!this.state.email) {
            this.setState({error: 'Email is not allowed to be empty.'})
            return false;
        } else if(this.state.password !== this.state.passwordRepeat) {
            this.setState({error: 'Passwords are not identical.'})
            return false;
        } else if (!this.state.captchaToken) {
            this.setState({error: 'Please confirm, you are not a robot.'})
            return false;
        }

        this.setState({error: ''})
        return true;
    }

    verifyCaptcha = (captchaToken) => {
        this.setState({captchaToken: captchaToken})
    }

    render() {
        return (
            <UserConsumer>
                {context => (
                    <div>
                        {!context.loggedIn ? (
                            <Modal size='tiny' trigger={<Menu.Item onClick={this.open} name='Sign up!' />}
                                open={this.state.open}
                                onClose={this.close}
                            >
                                <Modal.Header>Sign up</Modal.Header>
                                <Modal.Content style={{paddingTop: 0}}>
                                    <Form size='small' onSubmit={this.submit} error >
                                        <div>{this.error()}</div>
                                        <br></br>
                                        <Form.Field required>
                                            <label>Username</label>
                                            <input placeholder='Name' autoComplete='off' value={this.state.userName} onChange={ (e) => this.setState({ userName: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field required>
                                            <label>Email</label>
                                            <input placeholder='Email' autoComplete="new-password" value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field required>
                                            <label>Password</label>
                                            <input 
                                                type='password'
                                                placeholder='Password'
                                                spellCheck = "false"
                                                autoCapitalize = "off"
                                                autoComplete="new-password"
                                                autoCorrect = "off"
                                                value={this.state.password} 
                                                onChange={(e) => this.setState({ password: e.target.value })} 
                                            />
                                            <input 
                                                type='password'
                                                placeholder='Repeat'
                                                spellCheck = "false"
                                                autoCapitalize = "off"
                                                autoComplete="new-password"
                                                autoCorrect = "off"
                                                value={this.state.passwordRepeat} 
                                                onChange={(e) => this.setState({ passwordRepeat: e.target.value })} 
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <Captcha verifyCallback={this.verifyCaptcha} />
                                        </Form.Field>

                                        <Button type='submit' fluid size='large'>Sign up</Button>
                                    </Form>
                                </Modal.Content>
                            </Modal>
                        ) : ''}
                    </div>
                )}
            </UserConsumer>
        )
    }

    close = () => {
        this.setState({open: false});
    }
    open = () => {
        this.setState({open: true});
    }

}

export default SignUpForm;