import React from 'react';
import basePath from '../api/basePath';

class Test extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { posts: "hello test" };
	}
	
	componentDidMount() {
		this.getPosts();
	}
	
	render() {
		return <div>{this.state.posts}</div>
	}


	getPosts = async () => {
		await basePath({
			method: "get",
			url: "/api/posts/"
		})
		.then(res => {
			console.log(res.data)
			this.setState({
				posts: res.data[1]
			});
		});
	}
	
	populatePosts = async () => {
		await basePath({
			method: "post",
			url: "/api/posts/",
			data: {
				
			}
		})
	}
	
    authorId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    responseTo: {
        type: String
    }
	
	  postReservation = async () => {
    const reservationResponse = await basePath({
      method: "put",
      url: "/api/screenings/" + this.props.screeningId,
      data: {
        selectedSeats: this.props.selectedSeats,
        isOccupied: true
      },
      withCredentials: true
    });
	
	
}

export default Test;