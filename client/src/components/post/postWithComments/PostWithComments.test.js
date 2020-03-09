import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import PostWithComments from './PostWithComments';

//I get my ID from props.match.params.id (query) and it is required to be there
const id = {
    params: {
        id: 'abcde12345'
    }
}

describe('NewComment component', () => {
    test('renders without crashing', () => {
        shallow(<PostWithComments match={id} />);
    });

    test('match snapshot', () => {
        const component = create(<PostWithComments match={id} />);
        expect(component).toMatchSnapshot();
    });

});