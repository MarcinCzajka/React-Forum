import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { LocaleProvider } from '../contexts/LocaleContext';
import locale from '../locale/en/dictionary.json';
import TopPanel from './topPanel/TopPanel';
import PostList from './post/postList/PostList';
import PostWithComments from './post/postWithComments/PostWithComments';
import PostCreator from './post/postCreator/PostCreator';
import AboutMe from './aboutMe/AboutMe';
import { UserProvider } from '../contexts/UserContext';
import isToken from '../middleware/isToken';
import { loadReCaptcha } from 'react-recaptcha-google'
import "semantic-ui-css/semantic.min.css";
import './global.scss';
import './overlay.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: locale.feedPageLink,
            loggedIn: false,
            userName: '',
            userId: '',
            userAvatar: '',
            userCreatedAt: '',
            userEmail: ''
        };

        this.setContextData = this.setContextData.bind(this);
        this.addShowLoginToContext = this.addShowLoginToContext.bind(this);
        this.addShowSignupToContext = this.addShowSignupToContext.bind(this);
    }

    componentDidMount() {
        const data = isToken();
        if(data) this.setContextData(data);
        loadReCaptcha();
    }

    setContextData(data) {
        this.setState({
            loggedIn: (typeof data.loggedIn !== undefined ? data.loggedIn : this.state.loggedIn),
            userName: data.name || this.state.userName,
            userId: data._id || this.state.userId,
            userAvatar: data.avatar || this.state.userAvatar,
            userCreatedAt: data.createdAt || this.state.userCreatedAt,
            userEmail: data.email || this.state.userEmail,
            screenWidth: data.screenWidth || this.state.screenWidth,
            screenHeight: data.screenHeight || this.state.screenHeight
        })
    }

    addShowLoginToContext(func) {
        if (typeof func === 'function') {
            this.setState({showLogin: func});
        }
    }

    addShowSignupToContext(func) {
        if (typeof func === 'function') {
            this.setState({showSignup: func});
        }
    }

    render() {
        const contextValue = {
            loggedIn: this.state.loggedIn,
            userName: this.state.userName,
            userId: this.state.userId,
            userAvatar: this.state.userAvatar,
            userEmail: this.state.userEmail,
            userCreatedAt: this.state.userCreatedAt,
            showLogin: this.state.showLogin,
            showSignup: this.state.showSignup,
            
            setContextData: this.setContextData,
            addShowLoginToContext: this.addShowLoginToContext,
            addShowSignupToContext: this.addShowSignupToContext
        };
        
        return (
            <LocaleProvider value={locale}>     
                <Helmet>
                    <title>{locale.appName}</title>
                </Helmet>

                <Router>
                    <UserProvider value={contextValue} >
                        <TopPanel />
                        <Switch>
                            <Route path='/post/:id' exact component={PostWithComments} />
                            <Route path='/me' component={AboutMe} />
                            <Route path='/new' component={PostCreator} />
                            <Route path='/' component={PostList} />
                        </Switch>
                    </UserProvider>
                </Router>
            </LocaleProvider>
        )
    }
}

export default App;