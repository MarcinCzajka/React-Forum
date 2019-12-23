import React from 'react';
import { Helmet } from "react-helmet";

class Captcha extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                </Helmet>

                <div class="g-recaptcha" data-sitekey="6LdPf8kUAAAAACL0t2dMEN00RLz2NR495_4y4vzl"></div>

            </div>
        )
    }
}

export default Captcha