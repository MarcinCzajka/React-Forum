import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import PostList from './PostList';

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<PostList />);
    });

    test('match snapshot', () => {
        const component = create(<PostList />);
        expect(component).toMatchSnapshot();
    });

})