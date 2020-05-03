
import React from 'react';
import { Message } from 'semantic-ui-react';

export default props => {
    if(props.message) {
        return (
            <Message
                error
                attached={props.attached}
                content={props.message}
            />
        ) 
    } else {
        return ''
    }
}