import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import NewComment from './NewComment';
import { LocaleProvider } from '../../../../contexts/LocaleContext';
import testLocale from '../../../../locale/JestLocale/dictionary.json';

const emptyFnc = function() {};

const defaultProps = {
    handleReplyChange: emptyFnc,
    handleReplyBtnClick: emptyFnc,
    changeReplyFormVisibility: emptyFnc
}

describe('NewComment component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={testLocale}><NewComment {...defaultProps} /></LocaleProvider>);
    });

    test('match snapshot w/o being active', () => {
        const component = create(<LocaleProvider value={testLocale}><NewComment {...defaultProps} /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ being active', () => {
        const component = create(<LocaleProvider value={testLocale}><NewComment active={true} {...defaultProps} /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ replyContent 1/2', () => {
        const component = create(<LocaleProvider value={testLocale}><NewComment active={true} replyContent='123' {...defaultProps} /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot w/ replyContent 2/2', () => {
        const component = create(<LocaleProvider value={testLocale}><NewComment active={true} replyContent='asdfsdgdfgsd sdfsdf dsfdsgfdg dfdf' {...defaultProps} /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

});