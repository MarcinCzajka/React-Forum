import React from 'react';
import TopPanel from './TopPanel';
import ForumRoomList from './ForumRoomList';
import ForumPostsGroup from './ForumPostsGroup';
import AboutMe from './AboutMe';
import "semantic-ui-css/semantic.min.css";
import { UserProvider } from '../contexts/UserContext';
import isToken from '../middleware/isToken';


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
            userEmail: ''
        };

        this.switchPage = this.switchPage.bind(this);
        this.setContextData = this.setContextData.bind(this);
    }

    componentDidMount() {
        const data = isToken();
        if(data) this.setContextData(data);
    }
    
    switchPage(e, { name }) {
        this.setState({selectedPage: name});
    }

    setContextData(data) {
        this.setState({
            loggedIn: data.loggedIn,
            userName: data.name,
            userId: data._id,
            userAvatar: data.avatar,
            userCreatedAt: data.createdAt,
            userEmail: data.email,

            selectedPage: (!data.loggedIn && this.state.selectedPage === 'Me' ? 'Feed' : this.state.selectedPage )
        });
    }


    render() {
        const contextValue = {
            loggedIn: this.state.loggedIn,
            userName: this.state.userName,
            userId: this.state.userId,
            userAvatar: this.state.userAvatar,
            userEmail: this.state.userEmail,
            userCreatedAt: this.state.userCreatedAt,
            setContextData: this.setContextData
        };

        return (
            <UserProvider value={contextValue} >
                <TopPanel 
                    selectedPage={this.state.selectedPage} 
                    switchPage={this.switchPage}
                />
                <ForumPostsGroup display={this.state.selectedPage === 'Selected post' ? 'block' : 'none'} />
                <ForumRoomList display={this.state.selectedPage === 'Feed' ? 'block' : 'none'} />
                <AboutMe display={this.state.selectedPage === 'Me' ? 'block' : 'none'} />
            </UserProvider>
        )
    }
};

export default App;