import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import CommentToolkit from './CommentToolkit';

const requiredProps = {
    roomId: 'abcde12345',
    postId: 'bcdef23456',
    authorId: 'cdefg34567',
    handleReply: () => {},
    removeComment: () => {}
}

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<CommentToolkit {...requiredProps} />);
    });

    test('match snapshot 1/1', () => {
        const component = create(<CommentToolkit {...requiredProps} />);
        expect(component).toMatchSnapshot();
    });

})