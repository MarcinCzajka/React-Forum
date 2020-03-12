import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import LoginForm from '../form/LoginForm';
import { LocaleProvider } from '../../../contexts/LocaleContext';
import locale from '../../../locale/en/dictionary.json';

//This line is needed to render semantic-ui Modal content because of Portals used in this component
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('LoginForm component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}><LoginForm /></LocaleProvider>);
    });

    test('match snapshot', () => {
        const component = create(<LocaleProvider value={locale}><LoginForm /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

});