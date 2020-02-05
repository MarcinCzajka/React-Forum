import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import Captcha from './Captcha';
import ErrorMessage from '../../message/ErrorMessage';
import { LocaleConsumer } from '../../../contexts/LocaleContext';

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
            <LocaleConsumer>
                {locale => (
                    <Modal 
                        size='tiny'
                        open={open}
                        onClose={onClose}
                    >
                        <Modal.Header>{locale.signUp.modalHeader}</Modal.Header>
                        <Modal.Content>
                            <Form 
                                size='small'
                                onSubmit={() => submit(this.state)}
                                error
                            >

                                <ErrorMessage message={errorMessage} />

                                <Form.Field required>
                                    <label>{locale.signUp.label.username}</label>
                                    <input 
                                        value={this.state.userName}
                                        autoComplete='off'
                                        placeholder={locale.signUp.label.usernamePlaceholder}
                                        onChange={(e) => this.setState({ userName: e.target.value })} 
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>{locale.signUp.label.email}</label>
                                    <input 
                                        value={this.state.email}
                                        autoComplete="new-password"
                                        placeholder={locale.signUp.label.emailPlaceholder}
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>{locale.signUp.label.password}</label>
                                    <input 
                                        type='password'
                                        placeholder={locale.signUp.label.passwordPlaceholder}
                                        spellCheck = "false"
                                        autoCapitalize = "off"
                                        autoComplete="new-password"
                                        autoCorrect = "off"
                                        value={this.state.password} 
                                        onChange={(e) => this.setState({ password: e.target.value })} 
                                    />
                                    <input 
                                        type='password'
                                        placeholder={locale.signUp.label.passrepeatPlaceholder}
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

                                <Button type='submit' fluid size='large'>{locale.signUp.modalHeader}</Button>

                            </Form>

                        </Modal.Content>
                    </Modal>
                )}
            </LocaleConsumer>
        )
    }

}

export default SignUpForm;