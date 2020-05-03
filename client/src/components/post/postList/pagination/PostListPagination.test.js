import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import PostListPagination from './PostListPagination';

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<PostListPagination changePage={()=>{}} />);
    });

    test('match snapshot w/o props', () => {
        const component = create(<PostListPagination changePage={()=>{}} />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot wide screen /w props 1/3', () => {
        const component = create(<PostListPagination 
            activePage={1}
            totalPages={5}
            windowWidth={1024}
            changePage={()=>{}} 
        />);

        expect(component).toMatchSnapshot();
    });

    test('match snapshot rwd /w props 1/3', () => {
        const component = create(<PostListPagination 
            activePage={1}
            totalPages={5}
            windowWidth={480}
            changePage={()=>{}} 
        />);
        
        expect(component).toMatchSnapshot();
    });

    test('match snapshot wide screen /w props 2/3', () => {
        const component = create(<PostListPagination 
            activePage={3}
            totalPages={5}
            windowWidth={1024}
            changePage={()=>{}} 
        />);

        expect(component).toMatchSnapshot();
    });

    test('match snapshot rwd /w props 2/3', () => {
        const component = create(<PostListPagination 
            activePage={3}
            totalPages={5}
            windowWidth={480}
            changePage={()=>{}} 
        />);
        
        expect(component).toMatchSnapshot();
    });

    test('match snapshot wide screen /w props 3/3', () => {
        const component = create(<PostListPagination 
            activePage={10}
            totalPages={10}
            windowWidth={1024}
            changePage={()=>{}} 
        />);

        expect(component).toMatchSnapshot();
    });

    test('match snapshot rwd /w props 3/3', () => {
        const component = create(<PostListPagination 
            activePage={10}
            totalPages={10}
            windowWidth={480}
            changePage={()=>{}} 
        />);
        
        expect(component).toMatchSnapshot();
    });
})