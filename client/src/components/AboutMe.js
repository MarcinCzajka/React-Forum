import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { UserConsumer } from '../contexts/UserContext';
import { Helmet } from "react-helmet";

class AboutMe extends React.Component {

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

    render() {
        return (
            <UserConsumer>
                {context => (
                    <Card >
                        <Helmet>
                            <script defer src="https://widget.cloudinary.com/v2.0/global/all.js"></script>
                            <title>{context.userName} - React-forum</title>
                        </Helmet>

                        <Image src={context.userAvatar} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{context.userName}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Created at: {context.userCreatedAt}</span>
                            <span>{context.userEmail}</span>
                        </Card.Meta>
                        </Card.Content>
                    </Card>
                )}
            </UserConsumer>
        )
    }

}

export default AboutMe