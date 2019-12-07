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
            return <ForumRoom {...room} />;
        })
        return (
            <div style={{display:this.props.display}}>
                <NewRoomForm />
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