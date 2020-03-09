import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import NewComment from './NewComment';

const emptyFnc = () => {};

const defaultProps = {
    handleReplyChange:emptyFnc,
    handleReplyBtnClick:emptyFnc,
    changeReplyFormVisibility:emptyFnc
}

describe('NewComment component', () => {
    test('renders without crashing', () => {
        shallow(<NewComment defaultProps />);
    });

    test('match snapshot w/o being active', () => {
        const component = create(<NewComment defaultProps />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ being active', () => {
        const component = create(<NewComment active={true} defaultProps />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ replyContent 1/2', () => {
        const component = create(<NewComment active={true} replyContent='123' defaultProps />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ replyContent 1/2', () => {
        const component = create(<NewComment active={true} replyContent='asdfsdgdfgsd sdfsdf dsfdsgfdg dfdf' defaultProps />);
        expect(component).toMatchSnapshot();
    });

});