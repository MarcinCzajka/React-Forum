import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import UserContext from '../contexts/UserContext';
import AvatarPlaceholder from './placeholders/AvatarPlaceholder';
import moment from 'moment';
import { Helmet } from "react-helmet";
import './AboutMe.css';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {avatarReady: false}
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

    onAvatarLoad = () => {
		this.setState({avatarReady: true});
	}

    render() {
        const {userName, userAvatar, userEmail, userCreatedAt} = this.context;
        
        return (
            <Card className='cardMiddle' >
                <Helmet>
                    <script defer src="https://widget.cloudinary.com/v2.0/global/all.js"></script>
                    <title>{userName} - React-forum</title>
                </Helmet>

                {!this.state.avatarReady ? (
                    <AvatarPlaceholder size='sizeAboutMe' /> 
                    ) : ''}
                <Image src={userAvatar} onLoad={this.onAvatarLoad} wrapped ui={false} />

                <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>
                    <p style={{color: '#111'}}>Created at: {moment().format('MMMM Do YYYY, dddd')}</p>
                    <p>Email: {userEmail}</p>
                </Card.Meta>
                </Card.Content>
            </Card>
        )
    }

}

export default AboutMe