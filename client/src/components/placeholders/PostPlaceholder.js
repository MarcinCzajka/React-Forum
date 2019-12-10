import React from 'react';
import { Placeholder } from "semantic-ui-react";

class PostPlaceholder extends React.Component {

    render() {
        return (
            <Placeholder>
                <Placeholder.Header image>
                <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
        )
    }

}

export default PostPlaceholder