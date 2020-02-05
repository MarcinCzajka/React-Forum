import React from 'react';
import { Menu } from 'semantic-ui-react';
import SignUpForm from './form/SignUpForm';
import UserContext from '../../contexts/UserContext';
import initialVerification from './initialVerification';
import createAccount from './createAccount';
import { LocaleConsumer } from '../../contexts/LocaleContext';

class SignUpFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'open': false,
            'errorMessage': ''
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        //Append function to context that will display SignUpForm when called
        this.context.addShowSignupToContext(this.open);
    }

    submit = async (data) => {
        const error = initialVerification(data);

        if(error) {
            this.setState({errorMessage: error});
            return
        } else {
            this.setState({errorMessage: ''});
        }

        await createAccount(data)
            .then(result => {
                this.hideSignUpForm();
                alert('Acount created.');
            })
            .catch(err => {
                this.setState({errorMessage: err});
            });

    }

    open = () => {
        this.setState({open: true});
    }

    hideSignUpForm = () => {
        this.setState({open: false});
    }

    render() {
        if(this.context.loggedIn) return '';
        return (
            <LocaleConsumer>
                {locale => (
                    <>
                        <Menu.Item onClick={this.open} name={locale.signUp.button} />
                        <SignUpForm 
                            open={this.state.open}
                            onClose={this.hideSignUpForm}
                            submit={this.submit}
                            errorMessage={this.state.errorMessage}
                        />
                    </>
                )} 
            </LocaleConsumer>
        )
    }

}

export default SignUpFormContainer;