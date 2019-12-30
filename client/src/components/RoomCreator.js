import React from 'react';
import basePath from '../api/basePath';
import { Helmet } from "react-helmet";
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
			title: '',
			shortDescription: '',
			description: '',
			category: 'General',
			image: '',
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
        const result = limit - str.length;
        const color = (result < 15 ? 'red' : '');
        
        return <span style={{color: color}}>{result} letters left.</span>
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

    focus = (className) => {
        document.getElementsByClassName(className)[0].focus();
    }

    render() {
        return (
            <>
                <Helmet>
                    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
                </Helmet>

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

                        <header className='roomTitle noMargin noPadding' onClick={this.editTitle}>
                            <textarea 
                                className='titleInput'
                                placeholder='Change title'
                                value={this.state.title} 
                                onChange={e => {this.setState({title: e.target.value})}}>
                            </textarea>

                            <div className='titleOverlay' onClick={() => this.focus('titleInput')}>
                                <Icon name='edit outline'></Icon>
                            </div>
                        </header>

                        <main className='roomDescription noMargin noPadding' onClick={this.editDescription}>
                            <textarea 
                                className='descriptionInput'
                                placeholder='Type description of your post here'
                                value={this.state.description} 
                                onChange={e => {this.setState({description: e.target.value})}}>
                            </textarea>

                            <p>{this.spaceLeftCounter(this.state.description, 500)}</p>

                            <div className='descriptionOverlay' onClick={() => this.focus('descriptionInput')}>
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

                        <Button onClick={this.createNewRoom} type='button'>Upload Image</Button>
                        <Button onClick={this.uploadImage} type='submit' color='green'>Add post</Button>

                        <ImageModal image={this.state.image} alt={this.state.title} ref={this.imageModal} />

                    </div>
                </article>
            </>
        )
    }

}

export default RoomCreator;