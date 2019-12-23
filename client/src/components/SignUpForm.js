import React from 'react';
import { Message, Button, Form, Modal, Menu } from 'semantic-ui-react';
import basePath from '../api/basePath';
import UserContext from '../contexts/UserContext';
import { UserConsumer } from '../contexts/UserContext';
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

    login = () => {
        if(this.state.password !== this.state.passwordRepeat) {
            this.setState({error: 'Passwords are not identical.'})
            return;
        }

        basePath({
            method: 'post',
            url: '/api/users',
            data: {
                name: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            if (res.status === 200) {

                this.setState({
                    'open': false
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
                                <Modal.Content>
                                    <Form size='small' onSubmit={this.login} error >
                                        <div>{this.error()}</div>
                                        <br></br>
                                        <Form.Field required>
                                            <label>Username</label>
                                            <input placeholder='Name' value={this.state.userName} onChange={ (e) => this.setState({ userName: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field required>
                                            <label>Email</label>
                                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                                        </Form.Field>
                                        <Form.Field required>
                                            <label>Password</label>
                                            <input 
                                                type='password'
                                                placeholder='Password'
                                                spellcheck = "false"
                                                autocapitalize = "off"
                                                autocorrect = "off"
                                                value={this.state.password} 
                                                onChange={(e) => this.setState({ password: e.target.value })} 
                                            />
                                            <input 
                                                type='password'
                                                placeholder='Repeat'
                                                spellcheck = "false"
                                                autocapitalize = "off"
                                                autocorrect = "off"
                                                value={this.state.passwordRepeat} 
                                                onChange={(e) => this.setState({ passwordRepeat: e.target.value })} 
                                            />
                                        </Form.Field>

                                        <Captcha />

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