import React from 'react';
import { Message, Button, Form, Modal, Menu } from 'semantic-ui-react';
import basePath from '../api/basePath';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'buttonName': 'Log in',
            'email': '',
            'password': '',
            'error': ''
        };
    }

    login = () => {
        basePath({
            method: 'post',
            url: '/login',
            data: {
                email: this.state.email,
                password: this.state.password
            },
            withCredentials: true
        }).then(res => {
            if (res.status === 200) {

                this.setState({
                    'open': false,
                    'buttonName': 'Log out',
                    'email': '',
                    'password': '',
                    'error': ''
                })
            }
        }).catch(error => {
                console.log(error)
                this.setState({ error: error.response.data })
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
            <Modal size='tiny' trigger={<Menu.Item onClick={this.open} name={this.state.buttonName} />}
                open={this.state.open}
                onClose={this.close}
            >
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content>
                    <Form size='tiny' onSubmit={this.login} error >
                        <div>{this.error()}</div>
                        <br></br>
                        <Form.Field required>
                            <label>Email</label>
                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input placeholder='Password' value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value })} />
                        </Form.Field>
                        <Button type='submit' fluid size='large'>Sign in</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

    close = () => {
        this.setState({open: false});
    }
    open = () => {
        this.setState({open: true});
    }

}

export default LoginForm;