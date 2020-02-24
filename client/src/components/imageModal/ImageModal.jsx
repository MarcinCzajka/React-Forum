import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Icon, Loader } from "semantic-ui-react";
import './ImageModal.css'

class ImageModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {open: false, loading: true};
    }

    open = () => {
        this.setState({open: true});
    }

    close = () => {
        this.setState({open: false, loading: true});
    }

    hideLoader = () => {
        this.setState({loading: false})
    }

    render() {
        const { open, loading } = this.state
        
        return (
            <Dimmer page onClickOutside={this.close} active={open} >
                <div className='modalImageContainer' >
                    <Dimmer inverted active={loading}>
                        <Loader size='big' />
                    </Dimmer>
                    <img className='modalImage' onLoad={this.hideLoader} alt={this.props.alt} src={this.props.image} />
                    <Icon name='times' onClick={this.close} className='modalCloseIcon' />
                </div>
            </Dimmer>
        )
    }
}

ImageModal.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string
}

export default ImageModal