import React from 'react'
import basePath from '../api/basePath';
import { Grid, Pagination, Dimmer, Loader } from "semantic-ui-react";
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
            roomsLimit: 5,
            loading: true,
            removedRoomsCount: 0
        }
    }

    componentDidMount() {
        this.fetchForumRooms();
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
        const { activePage, totalPages } = this.state;

        if(totalPages > 1) return (
            <Grid.Row columns={3}>
                <Grid.Column floated='right'>
                    <Pagination onPageChange={this.changePage} activePage={activePage} totalPages={totalPages} />
                </Grid.Column>
            </Grid.Row>
        )
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
                <Dimmer inverted active={this.state.loading} >
                    <Loader />
                </Dimmer>

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