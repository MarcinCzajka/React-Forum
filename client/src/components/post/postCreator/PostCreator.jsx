import React from 'react';
import { Helmet } from "react-helmet";
import { Button, Statistic, Icon } from "semantic-ui-react";
import UserContext from '../../../contexts/UserContext';
import { LocaleConsumer } from '../../../contexts/LocaleContext';
import ImageModal from '../../imageModal/ImageModal';
import ErrorMessage from '../../message/ErrorMessage';
import { createForumPost } from '../forumPost/forumPostLogic/forumPostApi';
import '../forumPost/layout/ForumPost.scss';
import './PostCreator.scss';

class PostCreator extends React.Component {
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

    componentDidMount() {
        this.downloadCloudinaryWidget();
    }

    showImageModal = () => {
        if(this.state.image) this.imageModal.current.open();
    }

    createNewForumPost = () => {
        const { title, description, category, image } = this.state;
        createForumPost(this.context.userId, title, description, category, image)
            .then((res) => {
                if (res.status === 200) {
                    //Change location to new post location
                    window.location = window.location.origin + '/post/' + res.data._id;
                }
            })
            .catch(err => {
                this.setState({ error: err.response.data });
            })
    }

    focus = (className) => {
        if(typeof className !== 'string') return
        
        document.getElementsByClassName(className)[0].focus();
    }

    createWidget = () => {
        this.cloudinaryWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dswujhql5', uploadPreset: 'ot93kwr6',
            multiple: false,
            sources: [ 'local', 'url', 'camera' ],
            maxFileSize: 5000000 }, (error, result) => { 
              if (!error && result && result.event === "success") { 

                this.setState({image: result.info.secure_url});
                this.cloudinaryWidget.close();
              }
            }
        )
    }

    showWidget = () => {
        this.cloudinaryWidget.open();
    }

    downloadCloudinaryWidget = () => {
        const script = document.createElement('script');
        script.addEventListener('load', this.createWidget);
        script.async = true;
        script.defer = true;
        script.src = "https://widget.cloudinary.com/v2.0/global/all.js";

        document.getElementsByTagName('body')[0].appendChild(script);
    }

    changeTitle = (e) => {
        if(e.target.value.length >= 50) return;
        
        this.setState({title: e.target.value})
    }

    render() {
        const { title, description, image, error } = this.state;
        return (
            <LocaleConsumer>
                {locale => (
                    <>
                        <Helmet>
                            <title>{locale.postCreator.title} - {locale.appName}</title>
                        </Helmet>

                        <article className='roomContainer postContainerOverlay'>

                            <div>
                                {!this.context.loggedIn ? (
                                    <ErrorMessage 
                                        message={<p>Only <span className='asLink' onClick={this.context.showLogin}>logged in</span> users can post new stuff.</p>}  
                                    />
                                ) : error ? (
                                    <ErrorMessage message={error} />
                                ) : ''}
                            </div>

                            <div className='roomGrid noMargin noPadding' >

                                    <div className='roomImageContainer imageContainerInCreation' >
                                        <img 
                                            className='roomImage'
                                            src={image}
                                            alt={title}
                                        />
                                        <div className='imageOverlay imageOverlayInCreation' >
                                            <Icon id='zoomIcon' name='zoom-in' inverted size='huge' onClick={this.showImageModal} />
                                            <Icon id='uploadIcon' name='file outline image' size='huge' inverted onClick={this.showWidget}></Icon>
                                        </div>
                                    </div>

                                <header className='roomTitle roomTitleCreator noMargin noPadding' onClick={this.editTitle}>
                                    <textarea 
                                        className='titleInput'
                                        value={title} 
                                        placeholder={locale.postCreator.changeTitlePlaceholder}
                                        onChange={this.changeTitle}>
                                    </textarea>

                                    <div className='titleOverlay' onClick={() => this.focus('titleInput')}>
                                        <Icon name='edit outline'></Icon>
                                    </div>
                                </header>

                                <main className='roomDescription noMargin noPadding' onClick={this.editDescription}>
                                    <textarea 
                                        className='descriptionInput'
                                        value={description} 
                                        placeholder={locale.postCreator.changeContentPlaceholder}
                                        onChange={e => {this.setState({description: e.target.value})}}>
                                    </textarea>

                                    <p style={{color: (description.length <= 25)}}>
                                        {500 - description.length} letters left.
                                    </p>

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

                                <ImageModal
                                    image={image}
                                    alt={title}
                                    ref={this.imageModal}
                                />

                            </div>

                        </article>
                                
                        <Button 
                            className='createPostBtn' 
                            icon labelPosition='right' 
                            color='blue' 
                            onClick={this.createNewForumPost} 
                        >
                            {locale.postCreator.createPostButton}
                            <Icon name='paper plane' />
                        </Button>
                    </>
                )}
            </LocaleConsumer>
        )
    }

}

export default PostCreator;