import React from 'react';
import { Message, Button, Form, Modal, Menu, Checkbox } from 'semantic-ui-react';
import basePath from '../api/basePath';
import UserContext from '../contexts/UserContext';
import jwt_decode from 'jwt-decode';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'stayLogged': false,
            'buttonName': '',
            'email': '',
            'password': '',
            'error': ''
        }
    }

    static contextType = UserContext;
    
    componentDidMount() {
        this.context.addShowLoginToContext(this.open);
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
                const data = {...jwt_decode(document.cookie), ...{loggedIn: true}};
                this.context.setContextData(data);

                if(this.state.stayLogged) localStorage.setItem('token', document.cookie);

                this.setState({
                    'open': false,
                    'buttonName': 'Log out',
                    'email': '',
                    'password': '',
                    'passwordRepeat': '',
                    'error': ''
                })
            }
        }).catch(error => {
            console.log(error)
            this.setState({ error: error.response.data })
        });
    }

    logout = () => {
        localStorage.removeItem('token');
        document.cookie = 'x-auth-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        this.context.setContextData({
            loggedIn: false,
            userName: '',
            userId: '',
            userAvatar: '',
            userEmail: '',
            userCreatedAt: ''
        })
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

    close = () => {
        this.setState({open: false});
    }

    open = () => {
        this.setState({open: true});
    }

    render() {
        return (
            !this.context.loggedIn ? (
            <Modal size='tiny' trigger={<Menu.Item onClick={this.open} name="Log in" />}
                open={this.state.open}
                onClose={this.close}
            >
                <Modal.Header>Log in</Modal.Header>
                <Modal.Content style={{paddingTop: 0}}>
                    <Form size='small' onSubmit={this.login} error >
                        <div>{this.error()}</div>
                        <br></br>
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
                                onChange={(e) => this.setState({ password: e.target.value })} 
                            />
                        </Form.Field>
                        <Checkbox
                            checked={this.state.stayLogged}
                            label='Stay logged in' 
                            onChange={() => this.setState({ stayLogged: !this.state.stayLogged })} 
                        />

                        <Button style={{'marginTop':'15px'}} type='submit' fluid size='large'>Sign in</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            ) : (
                <Menu.Item onClick={this.logout} name="Log out" />
            )
        )
    }

}

export default LoginForm;