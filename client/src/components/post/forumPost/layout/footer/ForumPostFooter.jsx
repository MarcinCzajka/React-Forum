import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Statistic, Icon } from "semantic-ui-react";
import moment from 'moment';

const ForumPostFooter = props => (
    <Statistic.Group size='mini' className='maxWidth roomStats noMargin'>
        <Statistic className='leftStatistic'>
            <p>Author: {props.authorNick}</p>
            <p>Created: {moment(props.creationDate).format('YYYY-MM-DD')}</p>
        </Statistic>
        <Statistic className='roomStat'>
            <Statistic.Value>
                <Link to={`/post/${props._id}`}>
                    <Icon name='comments outline'> {props.commentsCount}</Icon>
                </Link>
            </Statistic.Value>
        </Statistic>

        <Statistic className='roomStat'>
            <Statistic.Value><Icon name='eye'/>  {props.views}</Statistic.Value>
        </Statistic>
        

        <Statistic className='roomStat' style={{cursor:'pointer'}} onClick={props.updateUpvote} >
            <Statistic.Value>
                <Icon 
                    style={{color: (props.isLikedByUser ? 'green' : '')}} 
                    name='thumbs up' />  {props.upvotes}
            </Statistic.Value>
        </Statistic>
    </Statistic.Group>
)

ForumPostFooter.defaultProps = {
    comments: 0,
    views: 0,
    upvotes: 0
}

ForumPostFooter.propTypes = {
    _id: PropTypes.string.isRequired,
	authorNick: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    commentsCount: PropTypes.number,
    views: PropTypes.number,
    upvotes: PropTypes.number,
    isLikedByUser: PropTypes.bool,
	updateUpvote: PropTypes.func.isRequired
}

export default ForumPostFooter