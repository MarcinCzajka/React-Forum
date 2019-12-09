import React from 'react';
import basePath from '../api/basePath';
import { Segment, Comment, Form, Button, Image} from "semantic-ui-react";
import moment from "moment";
import UserContext from '../contexts/UserContext';
import './global.css';

class ForumRoom extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			id: this.props.id,
			authorId: this.props.authorId,
			creationDate: this.props.creationDate,
			lastActivityDate: this.props.lastActivityDate,
			title: this.props.title,
			shortDescription: this.props.shortDescription,
			description: this.props.description,
			category: this.props.category,
			image: this.props.image,
			colorScheme: this.props.colorScheme
		}
	}

	static contextType = UserContext;
	
	render() {
		return (
			<div className="ui large comments maxWidth">
				<Segment.Group>
					
					<Segment.Group horizontal>
						<Segment className="noPadding imageSegment">
							<img className="segmentImg" src={this.state.image}/>
						</Segment>
						<Segment.Group className="noMargin maxWidth">
								<Segment>
								{this.state.title}
								</Segment>
							<Segment >
								<Comment.Text as='p' className="text">{this.state.shortDescription}</Comment.Text>
							</Segment>	
						</Segment.Group>
					</Segment.Group>
				</Segment.Group>
				<Form reply className={(this.context.selectedPage === 'Feed' ? 'shown' : 'hidden')}>
					<Form.TextArea value={this.state.replyContent} onChange={e => this.setState(e.target.value)} />
					<Button onClick={this.handleReplyToPost} content='Add Reply' labelPosition='left' icon='edit' primary />
				</Form>
			</div>
		)
	}

	getPostAuthorDetails = async () => {
		await basePath({
			method: "get",
			url: `/api/users/${this.state.authorId}`
		})
		.then(res => {
			this.setState({
				authorNick: res.data.name || "",
				avatar: res.data.avatar || "",
				loading: false
			});
		})
		.catch(err => {
			this.setState({
				authorNick: "Deleted user.",
				loading: false
			})
		})
	}

}

export default ForumRoom;