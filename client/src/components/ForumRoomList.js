import React from 'react'
import basePath from '../api/basePath';
import { Grid, Pagination } from "semantic-ui-react";
import ForumRoom from './ForumRoom';
import './global.css';

class ForumRoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            category: "General",
            activePage: 1,
            totalPages: 1,
            roomsLimit: 2,
            loading: true,
            removedRoomsCount: 0,

            windowWidth: window.innerWidth
        }
    }

    componentDidMount() {
        this.fetchForumRooms();
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    removeRoomFromState = (key) => {
        const rooms = this.state.rooms.filter(room => {
            return room.key !== key
        })

        const {roomsLimit, removedRoomsCount} = this.state;
        const totalPages =  Math.ceil((rooms.length - (removedRoomsCount + 1)) / roomsLimit);

        this.setState({rooms: rooms, removedRoomsCount: removedRoomsCount +1, totalPages: totalPages})
    }

    changePage = (e, { activePage }) => {
        this.setState({ activePage: activePage, loading: true });
        this.fetchForumRooms(activePage);
    }

    pagination = () => {
        const { activePage, totalPages, windowWidth } = this.state;

        const floated = windowWidth >= 960 ? 'right' : 'left';

        if(totalPages > 1) return (
            <Grid.Row columns={3}>
                <Grid.Column floated={floated}>
                    <Pagination onPageChange={this.changePage} activePage={activePage} totalPages={totalPages} />
                </Grid.Column>
            </Grid.Row>
        )
    }

    handleResize = () => {
        this.setState({windowWidth: window.innerWidth});
    }

    render() {
        const forumRooms = this.state.rooms.map(room => {
            return (
                <Grid.Row key={room.key} centered>
                    <ForumRoom {...room} removeRoom={this.removeRoomFromState} />
                </Grid.Row>
            );
        })
        
        return (
            <Grid className='noMargin'>
                {this.pagination()}
                    {forumRooms}
                {this.pagination()}
            </Grid>
        );
    }

    fetchForumRooms = (page = 1) => {
        basePath({
			method: "get",
            url: `/api/rooms/`,
            params: {
                roomsLimit: this.state.roomsLimit,
                page: page
            }
		})
		.then(res => {
            const arrayOfRooms = res.data.rooms.map(item => {
                return {...item, ...{arePropsUpdated: true, key: item._id}}
            })

            const totalPages =  Math.ceil(res.data.totalCount / this.state.roomsLimit);

            this.setState({rooms: arrayOfRooms, totalPages: totalPages});
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            this.setState({loading: false})
        })
    }

}

export default ForumRoomList;