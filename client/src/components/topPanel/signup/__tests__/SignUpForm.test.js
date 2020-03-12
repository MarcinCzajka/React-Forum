import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import SignUpForm from '../form/SignUpForm';
import { LocaleProvider } from '../../../contexts/LocaleContext';
import locale from '../../../locale/en/dictionary.json';

//This line is needed to render semantic-ui Modal content because of Portals used in this component
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('SignUpForm component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}><SignUpForm /></LocaleProvider>);
    });

    test('match snapshot', () => {
        const component = create(<LocaleProvider value={locale}><SignUpForm /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

});