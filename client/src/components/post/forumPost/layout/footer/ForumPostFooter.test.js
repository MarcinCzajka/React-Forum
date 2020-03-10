import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import ForumPostFooter from './ForumPostFooter';

const requiredProps = {
    _id: 'abcde12345',
    updateUpvote: ()=>{},
    authorNick: 'abcde asddf',
    creationDate: '2019-12-17T15:50:53.238Z'
}

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<Router><ForumPostFooter {...requiredProps} /></Router>);
    });

    test('match snapshot /w only required props', () => {
        const component = create(<Router><ForumPostFooter {...requiredProps} /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot - liked by user', () => {
        const component = create(<Router><ForumPostFooter {...requiredProps} isLikedByUser={true} /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 1/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
            comments={3}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 2/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
            comments={12}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 3/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
            views={333}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 4/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
            views={1014}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 5/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
            upvotes={24}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 6/10', () => {
        const component = create(<Router><ForumPostFooter 
            {...requiredProps} 
            isLikedByUser={true} 
            upvotes={345}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 7/10', () => {
        requiredProps.creationDate = '2019-12-20T20:18:54.783Z';
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 8/10', () => {
        requiredProps.creationDate = '2019-12-18T22:36:40.643Z';
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 9/10', () => {
        requiredProps.authorNick = 'mArIaN';
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w different data 10/10', () => {
        requiredProps.authorNick = 'gdffdsf1321243423413';
        const component = create(<Router><ForumPostFooter 
            {...requiredProps}
        /></Router>);
        expect(component).toMatchSnapshot();
    });

    
})