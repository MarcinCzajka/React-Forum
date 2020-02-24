import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserContext from '../../contexts/UserContext';
import LoginForm from './form/LoginForm';
import login from './login';
import handleLogout from './logout';
import { LocaleConsumer } from '../../contexts/LocaleContext';

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'open': false,
            'errorMessage': ''
        }
    }

    static contextType = UserContext;
    
    componentDidMount() {
        //Append function that will display LoginForm to context
        this.context.addShowLoginToContext(this.open);
    }

    handleLogin = async (data) => {
        const { email, password, stayLogged } = data;

        await login(email, password)
            .then(result => {
                this.context.setContextData({...result, loggedIn: true});
                
                if(stayLogged) localStorage.setItem('token', document.cookie);

                this.setState({
                    'open': false,
                    'email': '',
                    'password': '',
                    'errorMessage': ''
                })
            })
            .catch(err => {
                this.setState({ errorMessage: err })
            })
    }

    showSignup = () => {
        //Hide LoginForm and display SignUpForm
        this.hideLoginForm();
        this.context.showSignup();
    }

    showLoginForm = () => {
        this.setState({open: true});
    }

    hideLoginForm = () => {
        this.setState({open: false});
    }

    render() {
        return (
            <LocaleConsumer>
                {locale => (
                    !this.context.loggedIn ? (
                        <>
                            <Menu.Item onClick={this.showLoginForm} name={locale.login.loginButton} />
                            <LoginForm 
                                open={this.state.open}
                                onClose={this.hideLoginForm}
                                handleLogin={this.handleLogin}
                                errorMessage={this.state.errorMessage}
                                showSignup={this.showSignup}
                            />
                        </>
                    ) : (
                        <Menu.Item onClick={() => handleLogout(this.context)} name={locale.login.logoutButton} />
                    )
                )}
            </LocaleConsumer>
        )
    }

}

export default LoginFormContainer;