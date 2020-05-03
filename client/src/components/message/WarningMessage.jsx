
import React from 'react';
import { Message } from 'semantic-ui-react';

export default props => {
    if(props.message) {
        return (
            <Message
                warning
                attached={props.attached}
                header={props.message}
            />
        ) 
    } else {
        return ''
    }
}