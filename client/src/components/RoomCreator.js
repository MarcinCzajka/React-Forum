import React from 'react';
import basePath from '../api/basePath';
import { Form, Button, Statistic, Icon } from "semantic-ui-react";
import UserContext from '../contexts/UserContext';
import ImageModal from './ImageModal';
import './global.css';
import './ForumRoom.css';
import './RoomCreator.css';

class RoomCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
			authorId: '',
			title: 'Change title',
			shortDescription: '',
			description: '',
			category: 'general',
			image: 'https://kromex.com.au/wp-content/themes/Avada-Child/img/placeholder.png',
            colorScheme: 'standard',
            titleEditMode: false,
            titleBeforeEdit: '',
            descriptionEditMode: false,
            descriptionBeforeEdit: ''
        }

        this.imageModal = React.createRef();
    }

    static contextType = UserContext;

    componentDidMount() {
        this.setState({authorId: this.context.userName});
    }

    editTitle = () => {
        if(!this.state.titleEditMode) {
            this.setState({titleBeforeEdit: this.state.title, titleEditMode: true})
        }
    }

    titleSave = (e) => {
        e.stopPropagation();
        this.setState({titleBeforeEdit: this.state.title, titleEditMode: false})
    }

    titleCancel = (e) => {
        e.stopPropagation();
        this.setState({title: this.state.titleBeforeEdit, titleEditMode: false})
    }

    editDescription = () => {
        this.setState({descriptionEditMode: this.state.description, descriptionBeforeEdit: true})
    }

    render() {
        return (
            <article className='roomContainer'>

				<div className='roomGrid noMargin noPadding' >

						<div className='roomImageContainer' onClick={this.showImageModal}>
							<img 
								className='roomImage'
								src={this.state.image}
								alt={this.state.title}
							/>
							<div className='imageOverlay'>
								<Icon name='expand' inverted size='huge' />
							</div>
						</div>

					<header className='roomTitle' onClick={this.editTitle}>
                        {this.state.titleEditMode ? (
                            <>
                                <input className='titleInput' value={this.state.title} onChange={e => {this.setState({title: e.target.value})}}></input>
                                <Icon size='large' onClick={this.titleCancel} className='titleCancelIcon' color='red' name='cancel'></Icon>
                                <Icon size='large' onClick={this.titleSave} className='titleSaveIcon' color='green' name='check square'></Icon>
                            </>
                        ) : (
                            <>
                                <h3 className='noMargin noPadding' style={{display: 'inline-block'}}>{this.state.title}</h3> 
                                <Icon style={{marginLeft: '5px'}} name='edit outline'></Icon>
                            </>
                        )}
					</header>

					<main className='roomDescription noMargin noPadding' onClick={this.editDescription}>
						<p>{this.state.description}</p>
                        <div className='descriptionOverlay'>
                            <Icon name='edit outline' size='big'></Icon>
                        </div>
					</main>

					<footer className='roomFooter'>
						<Statistic.Group size='mini' className='maxWidth roomStats noMargin'>
							<Statistic className='roomStat'>
								<Statistic.Value>
                                    <Icon name='comments outline'> 0</Icon>
								</Statistic.Value>
							</Statistic>

							<Statistic className='roomStat'>
								<Statistic.Value><Icon name='eye'/>  0</Statistic.Value>
							</Statistic>
							

							<Statistic className='roomStat' >
								<Statistic.Value>
									<Icon name='thumbs up' />  0
								</Statistic.Value>
							</Statistic>
						</Statistic.Group>
					</footer>

					<ImageModal image={this.state.image} alt={this.state.title} ref={this.imageModal} />

				</div>
			</article>
        )
    }

}

export default RoomCreator;