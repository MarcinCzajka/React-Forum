import React from 'react';
import { Statistic, Segment, Icon } from "semantic-ui-react";
import './global.css';

class RoomStatsPanel extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			_id: this.props._id,
			authorId: this.props.authorId,
			creationDate: this.props.creationDate,
			lastActivityDate: this.props.lastActivityDate,
			title: this.props.title,
			shortDescription: this.props.shortDescription,
			description: this.props.description,
			category: this.props.category,
			image: this.props.image,
			colorScheme: this.props.colorScheme,
			upvotes: this.props.upvotes,
			views: this.props.views
		}
    }

    render() {
        return (
            <Segment>
                    <Statistic.Group size='mini'>
                        <Statistic>
                            <Statistic.Value><Icon name='thumbs up' />  {this.props.upvotes}</Statistic.Value>
                            <Statistic.Label>Upvotes</Statistic.Label>
                        </Statistic>
                        
                        <Statistic>
                            <Statistic.Value><Icon name='eye'/>  {this.props.views}</Statistic.Value>
                            <Statistic.Label>Views</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            
                        </Statistic>
                    </Statistic.Group>
            </Segment>
        )
    }

}
    
export default RoomStatsPanel