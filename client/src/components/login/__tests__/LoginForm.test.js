import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import LoginForm from '../form/LoginForm';

describe('LoginForm component', () => {
    test('renders without crashing', () => {
        shallow(<LoginForm />);
    });

    test('match snapshot', () => {
        const component = create(<LoginForm />);
        expect(component).toMatchSnapshot();
    });

});