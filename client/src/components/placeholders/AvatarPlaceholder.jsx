import React from 'react';
import { Icon } from "semantic-ui-react";
import './AvatarPlaceholder.css';

export default props => {
    return (
        <div className={`avatarPlaceholderContainer ${props.size}`} >
            <Icon className='avatarPlaceholder' name='user' />
        </div>
    )
}