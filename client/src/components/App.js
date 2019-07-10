import React from 'react';
import ForumRoomList from './ForumRoomList';
import ForumPostsGroup from './ForumPostsGroup';
import "semantic-ui-css/semantic.min.css";



class App extends React.Component {
    render() {
        return (
            <div>
                <ForumRoomList />
                <ForumPostsGroup />
            </div>
        )
    }
};

export default App;