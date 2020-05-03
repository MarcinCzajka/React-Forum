import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import CommentGroup from './CommentGroup';

describe('PostComment component', () => {
    test('renders without crashing', () => {
        shallow(<CommentGroup parentId='abcde12345' setHandleReply={() => {}} />);
    });

    test('match snapshot 1/2', () => {
        const component = create(<CommentGroup parentId='abcde12345'
            setHandleReply={() => {}}  
        />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot 2/2', () => {
        const component = create(<CommentGroup parentId='abcde12345' 
            initialPost={true} 
        />);
        expect(component).toMatchSnapshot();
    });

});