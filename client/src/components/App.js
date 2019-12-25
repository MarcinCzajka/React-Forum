import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopPanel from './TopPanel';
import ForumRoomList from './ForumRoomList';
import ForumPostsGroup from './ForumPostsGroup';
import AboutMe from './AboutMe';
import "semantic-ui-css/semantic.min.css";
import { UserProvider } from '../contexts/UserContext';
import isToken from '../middleware/isToken';
import './global.css';
import { loadReCaptcha } from 'react-recaptcha-google'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 'Feed',
            loggedIn: false,
            userName: '',
            userId: '',
            userAvatar: '',
            userCreatedAt: '',
            userEmail: '',
            pages: [
                {name: 'Feed'},
                {name: 'Me'}
            ]
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
            userEmail: data.email || this.state.userEmail
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
            pages: this.state.pages,
            showLogin: this.state.showLogin,
            showSignup: this.state.showSignup,
            
            setContextData: this.setContextData,
            addShowLoginToContext: this.addShowLoginToContext,
            addShowSignupToContext: this.addShowSignupToContext
        };
        
        return (
            <Router>
                <UserProvider value={contextValue} >
                    <TopPanel />
                    <Switch>
                        <Route path='/' exact component={ForumRoomList} />
                        <Route path='/post/:id' exact component={ForumPostsGroup} />
                        <Route path='/me' component={AboutMe} />
                    </Switch>
                </UserProvider>
            </Router>
        )
    }
}

export default App;