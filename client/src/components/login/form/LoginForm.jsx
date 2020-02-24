import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Checkbox } from 'semantic-ui-react';
import ErrorMessage from '../../message/ErrorMessage';
import { LocaleConsumer } from '../../../contexts/LocaleContext';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            stayLogged: false
        }
    }

    render() {
        const { open, onClose, handleLogin, errorMessage, showSignup } = this.props;

        return (
            <LocaleConsumer>
                {locale => (
                    <Modal 
                        size='tiny'
                        open={open}
                        onClose={onClose}
                    >
                        <Modal.Header>{locale.login.modalHeader}</Modal.Header>

                        <Modal.Content>
                            <Form 
                                error
                                size='small'
                                onSubmit={ () => { handleLogin(this.state) }}
                            >

                                <ErrorMessage message={errorMessage} />

                                <Form.Field required>
                                    <label>{locale.login.label.email}</label>
                                    <input
                                        value={this.state.email}
                                        placeholder={locale.login.label.emailPlaceholder}
                                        onChange={ (e) => this.setState({ email: e.target.value })}
                                    />
                                </Form.Field>

                                <Form.Field required>
                                    <label>{locale.login.label.password}</label>
                                    <input 
                                        type='password'
                                        placeholder={locale.login.label.passwordPlaceholder} 
                                        autoComplete = "new-password"
                                        spellCheck = "false"
                                        autoCapitalize = "off"
                                        autoCorrect = "off"
                                        value={this.state.password} 
                                        onChange={ (e) => this.setState({ password: e.target.value })} 
                                    />
                                </Form.Field>

                                <Checkbox
                                    checked={this.state.stayLogged}
                                    label={locale.login.stayLoggedIn}
                                    onChange={() => this.setState({ stayLogged: !this.state.stayLogged })} 
                                />

                                <Button style={{'marginTop':'15px'}} type='submit' fluid size='large'>{locale.login.submitButton}</Button>

                                <p>{locale.login.noAccountYet} <span className='asLink' onClick={showSignup}>{locale.login.signUpLink}</span>!</p>

                            </Form>
                        </Modal.Content>
                        
                    </Modal>
                )}
            </LocaleConsumer>
        )
    }
}

LoginForm.propTypes = {
    open: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    showSignup: PropTypes.func.isRequired
}

export default LoginForm;