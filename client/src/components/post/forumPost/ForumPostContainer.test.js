import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import ForumPostContainer from './ForumPostContainer';

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<ForumPostContainer _id='abcde12345' />);
    });

    test('match snapshot 1/1', () => {
        const component = create(<ForumPostContainer _id='abcde12345' setReady={() => {}} />);
        expect(component).toMatchSnapshot();
    });

});