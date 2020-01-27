import React from 'react';
import { Button, Form, Modal, Checkbox } from 'semantic-ui-react';
import ErrorMessage from '../../message/ErrorMessage';

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
            <Modal 
                size='tiny'
                open={open}
                onClose={onClose}
            >
                <Modal.Header>Log in</Modal.Header>

                <Modal.Content>
                    <Form 
                        error
                        size='small'
                        onSubmit={ () => { handleLogin(this.state) }}
                    >

                        <ErrorMessage message={errorMessage} />

                        <Form.Field required>
                            <label>Email</label>
                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                        </Form.Field>

                        <Form.Field required>
                            <label>Password</label>
                            <input 
                                type='password'
                                placeholder='Password' 
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
                            label='Stay logged in' 
                            onChange={() => this.setState({ stayLogged: !this.state.stayLogged })} 
                        />

                        <Button style={{'marginTop':'15px'}} type='submit' fluid size='large'>Sign in</Button>

                        <p>Don't have account yet? <span className='asLink' onClick={showSignup}>Sign up</span>!</p>

                    </Form>
                </Modal.Content>
                
            </Modal>
        )
    }

}

export default LoginForm;