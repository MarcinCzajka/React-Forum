import React from 'react';
import { Placeholder } from 'semantic-ui-react';

export default () => {
    return (
        <div style={{display: 'flex'}}>
            <Placeholder style={{ height: '150px', width: '220px' }}>
                <Placeholder.Image />
            </Placeholder>
            <Placeholder style={{ height: '100%', width: '100%', margin:'10px'}}>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder>
        </div>
    )
}