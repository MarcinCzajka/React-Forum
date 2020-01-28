import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import Captcha from './Captcha';
import ErrorMessage from '../../message/ErrorMessage';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'userName': '',
            'email': '',
            'password': '',
            'passwordRepeat': '',
            'captchaToken': ''
        }
    }

    verifyCaptcha = (captchaToken) => {
        this.setState({captchaToken: captchaToken})
    }

    render() {
        const { 
            open, 
            onClose,
            submit,
            errorMessage
        } = this.props;

        return (
            <Modal 
                size='tiny'
                open={open}
                onClose={onClose}
            >
                <Modal.Header>Sign up</Modal.Header>
                <Modal.Content>
                    <Form 
                        size='small'
                        onSubmit={() => submit(this.state)}
                        error
                    >
                        <ErrorMessage message={errorMessage} />
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
        )
    }

}

export default SignUpForm;