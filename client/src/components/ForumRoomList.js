import React from 'react'
import basePath from '../api/basePath';
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
            return <ForumRoom roomId={room.id} />;
        })
        return (
            <div>
                <div style={{display:this.props.display}}>
                    <NewRoomForm />
                </div>
                {forumRooms}
            </div>
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
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    colorScheme: item.colorScheme
                };
            });
            console.log(arrayOfRooms)
            this.setState({rooms: arrayOfRooms});
		}).catch(err => {
            console.log(err)
        })
    }
};

export default ForumRoomList;