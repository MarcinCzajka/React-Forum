import React from 'react'
import basePath from '../api/basePath';
import { Grid } from "semantic-ui-react";
import ForumRoom from './ForumRoom';
import NewRoomForm from './NewRoomForm';
import './global.css';

class ForumRoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            category: "General"
        };

        this.getTopVotedPosts = this.getTopVotedPosts.bind(this);
    }

    componentDidMount() {
        this.fetchForumRooms();
    }

    render() {
        const forumRooms = this.state.rooms.map(room => {
            return (
                <Grid.Row key={room.key} centered>
                    <ForumRoom {...room} />
                </Grid.Row>
            );
        })

        return (
            <Grid>
                <NewRoomForm />
                {forumRooms}
            </Grid>
        );
    }

    fetchForumRooms = () => {
        basePath({
			method: "get",
			url: `/api/rooms/`
		})
		.then(res => {
            const arrayOfRooms = res.data.map(item => {
                this.getTopVotedPosts(item._id)
                
                return {...item, ...{loading: false, arePropsUpdated: true, key: item._id}}
            })

            this.setState({rooms: arrayOfRooms});
		}).catch(err => {
            console.log(err)
        })
    }

    getTopVotedPosts(id) {
        const responseTo = 'responseTo=' + id;
		basePath({
		  method: "get",
		  url: `/api/posts/top?${limit}&${responseTo}`,
		  withCredentials: true
      })
      .then(res => {
          const roomsWithComments = this.state.rooms.map(room => {
              if(room._id === id) {
                  room.comments = res.data.length;
                  return room;
              }
              return room;
          })
          this.setState({rooms: roomsWithComments})
      })
    }

}

export default ForumRoomList;