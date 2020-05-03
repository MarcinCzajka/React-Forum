import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import PostCreator from './PostCreator';
import { UserProvider } from '../../../contexts/UserContext';
import { LocaleProvider } from '../../../contexts/LocaleContext';

const locale = {
    appName: 'abedef',
    postCreator: {
        title: 'abcde',
        changeTitlePlaceholder: 'abcde',
        changeContentPlaceholder: 'fdsfds',
        createPostButton: 'afdfsddf'
    }
}

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}><PostCreator /></LocaleProvider>);
    });

    test('match snapshot w/o locale and userContext', () => {
        const component = create(<LocaleProvider value={locale}><PostCreator /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w locale and w/o userContext', () => {
        const component = create(<LocaleProvider value={locale}><PostCreator /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w locale and user logged in', () => {
        const component = create(<LocaleProvider value={locale}>
            <UserProvider value={{loggedIn: true}} >
                <PostCreator />
            </UserProvider>
        </LocaleProvider>
    );
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w locale and user logged out', () => {
        const component = create(<LocaleProvider value={locale}>
            <UserProvider value={{loggedIn: false}} >
                <PostCreator />
            </UserProvider>
        </LocaleProvider>
    );
        expect(component).toMatchSnapshot();
    });

});