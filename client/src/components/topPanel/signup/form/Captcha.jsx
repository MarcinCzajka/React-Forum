import React from 'react';
import PropTypes from 'prop-types';
import { ReCaptcha } from 'react-recaptcha-google'

class Captcha extends React.Component {
    
    componentDidMount = () => {
        if (this.recaptcha) {
            this.recaptcha.reset();
        }
    }

    onLoadRecaptcha = () => {
        if (this.recaptcha) {
            this.recaptcha.reset();
        }
    }

    render() {
        return (
            <ReCaptcha
                ref={(el) => {this.recaptcha = el}}
                size="normal"
                data-theme="light"            
                render="explicit"
                sitekey="6LdPf8kUAAAAACL0t2dMEN00RLz2NR495_4y4vzl"
                onloadCallback={this.onLoadRecaptcha}
                verifyCallback={this.props.verifyCallback}
            />
        )
    }
}

Captcha.propTypes = {
    verifyCallback: PropTypes.func.isRequired
}

export default Captcha