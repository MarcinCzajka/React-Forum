import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import './ForumPostPlaceholder.scss';

export default () => {
    return (
        <div className='postPlaceholder' >
            <Placeholder >
                <Placeholder.Image />
            </Placeholder>
            <Placeholder >
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder>
        </div>
    )
}