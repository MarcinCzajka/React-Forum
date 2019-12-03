import React from 'react';
import TopPanel from './TopPanel';
import ForumRoomList from './ForumRoomList';
import ForumPostsGroup from './ForumPostsGroup';
import "semantic-ui-css/semantic.min.css";



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 'Feed',
            loggenIn: false
        };

        this.switchPage = this.switchPage.bind(this);
    }
    
    switchPage(e, { name }) {
        this.setState({selectedPage: name});
    }

    

    render() {
        return (
            <div>
                <TopPanel 
                    selectedPage={this.state.selectedPage} 
                    switchPage={this.switchPage}
                />
                <ForumPostsGroup display={this.state.selectedPage === 'Selected post' ? 'block' : 'none'} />
                <ForumRoomList display={this.state.selectedPage === 'Feed' ? 'block' : 'none'} />
            </div>
        )
    }
};

export default App;