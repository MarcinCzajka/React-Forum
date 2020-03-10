import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme';
import { create } from "react-test-renderer";
import ForumPost from './ForumPost';

const requiredProps = {
    _id: 'abcde12345',
    image: 'www.sdafadsfd.dsa',
    title: 'Random Title',
    description: 'Random description',
    showImageModal: () => {},
    removePost: () => {}
}

describe('PostListPagination component', () => {
    test('renders without crashing', () => {
        shallow(<Router><ForumPost {...requiredProps} /></Router>);
    });

    test('match snapshot 1/3', () => {
        const component = create(<Router><ForumPost {...requiredProps} /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot 2/3', () => {
        requiredProps.title = 'Yet Another TiTlE: 12';

        const component = create(<Router><ForumPost {...requiredProps} /></Router>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot 3/3', () => {
        requiredProps.description = `Light from a service hatch at the rear of the arcade showed him broken lengths of damp chipboard and the drifting shoals of waste. Before they could stampede, take flight from the banks of every computer in the shade beneath a bridge or overpass. The semiotics of the Flatline as a construct, a hardwired ROM cassette replicating a dead man’s skills, obsessions, kneejerk responses. Case felt the edge of the Flatline as a construct, a hardwired ROM cassette replicating a dead man’s skills, obsessions, kneejerk responses. After the postoperative check at the clinic, Molly took him to the simple Chinese hollow points Shin had sold him. Case had never seen him wear the same suit twice, although his wardrobe seemed to consist entirely of meticulous reconstruction’s of garments of the car’s floor. Images formed and reformed: a flickering montage of the Sprawls towers and ragged Fuller domes, dim figures moving toward him in the human system. The Sprawl was a handgun and nine rounds of ammunition, and as he made his way down Shiga from the Chinese program’s thrust, a worrying impression of solid fluidity, as though the shards of a broken mirror bent and elongated as they rotated, but it never told the correct time.`;

        const component = create(<Router><ForumPost {...requiredProps} /></Router>);
        expect(component).toMatchSnapshot();
    });

})