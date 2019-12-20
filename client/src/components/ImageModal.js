import React from 'react';
import { Dimmer } from "semantic-ui-react";
import './ImageModal.css'

class ImageModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {image: this.props.image, open: false};
    }

    open = () => {
        this.setState({open: true});
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const { open } = this.state
        
        return (
            <Dimmer page onClickOutside={this.close} active={open} >
                <div className='modalImageContainer' >
                    <img className='modalImage' src={this.state.image} />
                </div>
            </Dimmer>
        )
    }
}

export default ImageModal