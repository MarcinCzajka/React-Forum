import React from 'react';
import { Icon } from "semantic-ui-react";
import './AvatarPlaceholder.css';

class AvatarPlaceholder extends React.Component {

    render() {
        return (
            <div className='avatarPlaceholderContainer' >
                <Icon className='avatarPlaceholder' name='user' />
            </div>
        )
    }

}

export default AvatarPlaceholder;