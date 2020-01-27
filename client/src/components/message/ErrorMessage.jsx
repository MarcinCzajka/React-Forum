
import React from 'react';
import { Message } from 'semantic-ui-react';

export const ErrorMessage = props => {
    console.log(props)
    if(props.message) {
        return (
            <Message 
                error
                header = 'Error'
                content = {props.message} 
            />
        ) 
    } else {
        return ''
    }
}