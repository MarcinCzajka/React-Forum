import React from 'react';
import { Statistic, Icon, Grid } from "semantic-ui-react";
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
            <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                    <Statistic size='mini'>
                        <Statistic.Value></Statistic.Value>
                        <Statistic.Label></Statistic.Label>
                    </Statistic>
                </Grid.Column>
                <Grid.Column>
                    <Statistic.Group size='mini'>
                        <Statistic>
                            <Statistic.Value><Icon name='thumbs up' />  {this.state.upvotes}</Statistic.Value>
                            <Statistic.Label>Upvotes</Statistic.Label>
                        </Statistic>
                        
                        <Statistic>
                            <Statistic.Value><Icon name='eye'/>  {this.state.views}</Statistic.Value>
                            <Statistic.Label>Views</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Grid.Column>
            </Grid>
        )
    }

}
    
export default RoomStatsPanel