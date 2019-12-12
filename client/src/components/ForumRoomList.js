import React from 'react'
import { Link } from 'react-router-dom';
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
                    <div className="ui comments large maxWidth" >
                        <Link to={`post/${room._id}`} className='forumRoomLink' >
                            <ForumRoom {...room} />
                        </Link>
                    </div>
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
                
                return {
                    _id: item._id,
                    key: item._id,
                    authorId: item.authorId,
                    creationDate: item.creationDate,
                    lastActivityDate: item.lastActivityDate,
                    title: item.title,
                    shortDescription: item.shortDescription,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    colorScheme: item.colorScheme,
                    loading: false
                }
            })

            this.setState({rooms: arrayOfRooms});
		}).catch(err => {
            console.log(err)
        })
    }

    getTopVotedPosts(id) {
        const limit = 'limit=5';
        const responseTo = 'responseTo=' + id;
		basePath({
		  method: "get",
		  url: `/api/posts/top?${limit}&${responseTo}`,
		  withCredentials: true
      })
      .then(res => {
          console.log(res)
      })
    }

}

export default ForumRoomList;