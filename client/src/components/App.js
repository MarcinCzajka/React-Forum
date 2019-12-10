import React from 'react';
import TopPanel from './TopPanel';
import ForumRoomList from './ForumRoomList';
import ForumPostsGroup from './ForumPostsGroup';
import AboutMe from './AboutMe';
import "semantic-ui-css/semantic.min.css";
import { UserProvider } from '../contexts/UserContext';
import isToken from '../middleware/isToken';
import './global.css';


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
            selectedRoomData: {},

            pages: ['Feed', 'Selected Post', 'Me']
        };

        this.switchPage = this.switchPage.bind(this);
        this.setContextData = this.setContextData.bind(this);
    }

    componentDidMount() {
        const data = isToken();
        if(data) this.setContextData(data);
    }
    
    switchPage( name ) {
        this.setState({selectedPage: name});
    }

    setContextData(data) {
        this.setState({
            loggedIn: data.loggedIn || this.state.loggedIn,
            userName: data.name || this.state.userName,
            userId: data._id || this.state.userId,
            userAvatar: data.avatar || this.state.userAvatar,
            userCreatedAt: data.createdAt || this.state.userCreatedAt,
            userEmail: data.email || this.state.userEmail,
            selectedRoomData: data.selectedRoomData || this.state.selectedRoomData,

            selectedPage: (!data.loggedIn && this.state.selectedPage === this.state.pages[2] ? 'Feed' : this.state.selectedPage ),
        });
    };



    render() {
        const contextValue = {
            loggedIn: this.state.loggedIn,
            userName: this.state.userName,
            userId: this.state.userId,
            userAvatar: this.state.userAvatar,
            userEmail: this.state.userEmail,
            userCreatedAt: this.state.userCreatedAt,
            selectedPage: this.state.selectedPage,
            selectedRoomData: this.state.selectedRoomData,
            setContextData: this.setContextData,
            switchPage: this.switchPage,
            pages: this.state.pages
        };
        
        return (
            <UserProvider value={contextValue} >
                <TopPanel 
                    selectedPage={this.state.selectedPage} 
                    switchPage={this.switchPage}
                />
                <ForumRoomList cssVisibility={this.state.selectedPage === this.state.pages[0] ? 'shown' : 'hidden'} />
                <ForumPostsGroup cssVisibility={this.state.selectedPage === this.state.pages[1] ? 'shown' : 'hidden'} />
                <AboutMe cssVisibility={this.state.selectedPage === this.state.pages[2] ? 'shown' : 'hidden'} />
            </UserProvider>
        )
    }
};

export default App;