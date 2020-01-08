import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import UserContext from '../contexts/UserContext';
import AvatarPlaceholder from './placeholders/AvatarPlaceholder';
import moment from 'moment';
import { Helmet } from "react-helmet";
import './AboutMe.css';
import basePath from '../api/basePath';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {avatarReady: false, avatarFromState: false};
    }

    static contextType = UserContext;

    componentDidMount() {
        this.downloadCloudinaryWidget();
    }
    
    createWidget = () => {
        this.cloudinaryWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dswujhql5', uploadPreset: 'ot93kwr6',
            multiple: false,
            sources: [ 'local', 'url', 'camera' ],
            maxFileSize: 5000000 }, (error, result) => { 
              if (!error && result && result.event === "success") { 

                this.updateImage(result.info.secure_url);
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

    onAvatarLoad = () => {
		this.setState({avatarReady: true});
    }
    
    updateImage = (url) => {
        basePath({
            method: 'put',
            url: `/api/users/avatar/${this.context.userId}`,
            data: {
                avatar: url
            },
            withCredentials: true
        }).then(res => {
            this.setState({avatarFromState: res.data});
        });
    }

    render() {
        const {loggedIn, userName, userAvatar, userEmail, userCreatedAt} = this.context;
        const createdAt = moment(userCreatedAt).format('MMMM Do YYYY, dddd')
        
        return (
            <Card className='cardMiddle' >
                <Helmet>
                    <title>About Me - React-forum</title>
                </Helmet>

                <div onClick={this.showWidget} className='avatarOverlay'>
                    <Icon name='file outline image' size='huge' inverted></Icon>
                </div>

                {!this.state.avatarReady ? (
                    <AvatarPlaceholder size='sizeAboutMe' /> 
                    ) : ''}
                <Image src={this.state.avatarFromState || userAvatar} onLoad={this.onAvatarLoad} wrapped ui={false} />

                <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>
                    <p className='darkFont'>Created at: {createdAt}</p>
                    <p className='darkFont'>Email: {userEmail}</p>
                </Card.Meta>
                </Card.Content>
            </Card>
        )
    }

}

export default AboutMe