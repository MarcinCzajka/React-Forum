import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import LoginForm from '../form/LoginForm';

//This line is needed to render semantic-ui Modal content because of Portals used in this component
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('LoginForm component', () => {
    test('renders without crashing', () => {
        shallow(<LoginForm />);
    });

    test('match snapshot', () => {
        const component = create(<LoginForm />);
        expect(component).toMatchSnapshot();
    });

});