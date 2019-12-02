import React from 'react'
import basePath from '../api/basePath';

class ForumRoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            category: "All"
        };
    };

    componentDidMount() {
        this.fetchForumRooms();
    };

    render() {
        return (
            <div></div>
        );
    };

    fetchForumRooms = async () => {
        const params = (this.state.category === "All" ? `category=${this.state.category}` : "")
        await basePath({
			method: "get",
			url: `/api/rooms/${params}`
		})
		.then(res => {
            const arrayOfRooms = res.data.map(item => {
                return {
                    id: item._id,
                    key: item._id,
                    creatorId: item.creatorId,
                    creationDate: item.creationDate,
                    lastActivityDate: item.lastActivityDate,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    colorScheme: item.colorScheme
                };
            });

            this.setState({rooms: arrayOfRooms});
		});
    };
};

export default ForumRoomList;