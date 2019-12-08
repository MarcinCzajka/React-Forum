import React from 'react'
import basePath from '../api/basePath';
import { Grid } from "semantic-ui-react";
import ForumRoom from './ForumRoom';
import NewRoomForm from './NewRoomForm';

class ForumRoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            category: "General"
        };
    }

    componentDidMount() {
        this.fetchForumRooms();
    }

    render() {
        const forumRooms = this.state.rooms.map(room => {
            return (
                <Grid.Row centered>
                    <ForumRoom {...room} />
                </Grid.Row>
            );
        })
        return (
            <Grid style={{display:this.props.display}}>
                <NewRoomForm />
                {forumRooms}
            </Grid>
        );
    }

    fetchForumRooms = () => {
        const params = (this.state.category ? `category=${this.state.category}` : "")
        basePath({
			method: "get",
			url: `/api/rooms/`
		})
		.then(res => {
            const arrayOfRooms = res.data.map(item => {
                return {
                    id: item._id,
                    key: item._id,
                    authorId: item.authorId,
                    creationDate: item.creationDate,
                    lastActivityDate: item.lastActivityDate,
                    title: item.title,
                    shortDescription: item.shortDescription,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    colorScheme: item.colorScheme
                };
            });
            this.setState({rooms: arrayOfRooms});
		}).catch(err => {
            console.log(err)
        })
    }
};

export default ForumRoomList;