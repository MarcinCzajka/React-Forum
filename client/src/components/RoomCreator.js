import React from 'react';
import basePath from '../api/basePath';
import { Button, Statistic, Icon, Message } from "semantic-ui-react";
import UserContext from '../contexts/UserContext';
import ImageModal from './ImageModal';
import './global.css';
import './ForumRoom.css';
import './RoomCreator.css';

class RoomCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
			title: 'Change title',
			shortDescription: '',
			description: '',
			category: 'General',
			image: '',
            titleEditMode: false,
            titleBeforeEdit: '',
            descriptionEditMode: false,
            descriptionBeforeEdit: '',
            error: ''
        }

        this.imageModal = React.createRef();
    }

    static contextType = UserContext;

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
        if(!this.state.descriptionEditMode) {
            this.setState({descriptionBeforeEdit: this.state.description, descriptionEditMode: true})
        }
    }

    showImageModal = () => {
		this.imageModal.current.open();
    }
    
    spaceLeftCounter = (str, limit) => {
        if(str) {
            const result = limit - str.length;
            const color = (result < 15 ? 'red' : '');
            
            return <span style={{color: color}}>{result} letters left.</span>
        }
    }

    createNewRoom = () => {
        basePath({
            method: "post",
            url: `/api/rooms/`,
            data: {
                authorId: this.context.userId,
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                image: this.state.image
            },
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    'open': false,
                    description: '',
                    category: 'General',
                    image: ''
                });
            };
        })
        .catch(err => {
            console.log(err);
            this.setState({ error: err.response.data });
        })
    }

    error = () => {
        if (this.state.error) {
            return (
                <Message error
                header = 'Error'
                content = {this.state.error} />
            )
        }
    }

    render() {
        return (
            <article className='roomContainer'>
                <div>{this.error()}</div>
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
                        {this.state.descriptionEditMode ? (
                            <>
                                <textarea className='descriptionInput' value={this.state.description} onChange={e => {this.setState({description: e.target.value})}}></textarea>
                                <p>{this.spaceLeftCounter(this.state.description, 500)}</p>
                            </>
                        ) : (
                            <>
                                <p>{this.state.description}</p>
                                <div className='descriptionOverlay'>
                                    <Icon name='edit outline' size='big'></Icon>
                                </div>
                            </>
                        )}
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

                    <Button onClick={this.createNewRoom} type='submit' color='green'>Add post</Button>

					<ImageModal image={this.state.image} alt={this.state.title} ref={this.imageModal} />

				</div>
			</article>
        )
    }

}

export default RoomCreator;