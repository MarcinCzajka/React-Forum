import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Pagination } from "semantic-ui-react";

const PostListPagination = props => {
    if(props.totalPages > 1) return (
        <Grid.Row columns={3}>
            <Grid.Column floated={ (props.windowWidth < 960 ? 'left' : 'right') }>
                <Pagination onPageChange={props.changePage} activePage={props.activePage} totalPages={props.totalPages} />
            </Grid.Column>
        </Grid.Row>
    );

    return ''
}

PostListPagination.defaultProps = {
    activePage: 1,
    totalPages: 1
}

PostListPagination.propTypes = {
    activePage: PropTypes.number,
    totalPages: PropTypes.number,
    windowWidth: PropTypes.number,
    changePage: PropTypes.func.isRequired
}

export default PostListPagination