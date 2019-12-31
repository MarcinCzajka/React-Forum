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
            roomsLimit: 2
        }
    }

    componentDidMount() {
        this.fetchForumRooms();
    }

    removeRoomFromState = (key) => {
        const rooms = this.state.rooms.filter(room => {
            return room.key !== key
        })
        this.setState({rooms: rooms})
    }

    changePage = (e, { activePage }) => {
        this.setState({ activePage });
        this.fetchForumRooms(activePage);
    }

    render() {
        const forumRooms = this.state.rooms.map(room => {
            return (
                <Grid.Row key={room.key} centered>
                    <ForumRoom {...room} removeRoom={this.removeRoomFromState} />
                </Grid.Row>
            );
        })

        const { activePage, totalPages } = this.state;

        return (
            <Grid className='noMargin'>
                <Pagination onPageChange={this.changePage} activePage={activePage} totalPages={totalPages} />
                {forumRooms}
                <Pagination onPageChange={this.changePage} activePage={activePage} totalPages={totalPages} />
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
    }

    getTopVotedPosts = (id) => {
        const responseTo = 'responseTo=' + id;
		basePath({
		  method: "get",
		  url: `/api/posts/top?${responseTo}`,
		  withCredentials: true
      })
      .then(res => {

      })
    }

}

export default ForumRoomList;