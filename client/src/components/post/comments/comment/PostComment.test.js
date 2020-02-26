import React from 'react';
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import PostComment from './PostComment';
import { LocaleProvider } from '../../../../contexts/LocaleContext';
import locale from '../../../../locale/en/dictionary.json';

console.log(locale)

const roomId = "12345";
const postId = "12345";
const userId = "12345";
const authorId = "12345";
const handleReply = () => {};
const removeComment = () => {};
const avatar = "www";
let date = '2019-12-17T15:50:53.238Z';
let authorNick = 'Testotron';
let content = 'Super comment 123';

describe('PostComment component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}><PostComment
            date={date}
            showPlaceholder={false}
            roomId={roomId}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
    });

    test('match snapshot while showing placeholder 1/1', () => {
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={true}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w changing date 1/3', () => {
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w changing date 2/3', () => {
        date = '2019-12-18T22:36:40.643Z'
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w changing date 3/3', () => {
        date = '2019-12-20T20:18:54.783Z'
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w changing Author Name 1/2', () => {
        authorNick = 'Deleted User.';
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w changing Author Name 2/2', () => {
        authorNick = 'LiterallyNobody66';
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w Avatar 1/1', () => {
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            avatar={avatar}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w Changing Content 1/2', () => {
        content = 'very different stuff';
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            avatar={avatar}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w Changing Content 2/2', () => {
        content = '123234tdgdsss43';
        const component = create(<LocaleProvider value={locale}><PostComment 
            date={date}
            roomId={roomId}
            showPlaceholder={false}
            postId={postId}
            userId={userId}
            authorNick={authorNick}
            authorId={authorId}
            handleReply={handleReply}
            removeComment={removeComment}
            avatar={avatar}
            content={content}
        /></LocaleProvider>);
        expect(component).toMatchSnapshot();
    });

});