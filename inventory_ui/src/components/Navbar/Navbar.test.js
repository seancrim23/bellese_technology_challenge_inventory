import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';

describe('Testing the <Navbar /> component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navbar />);
    });

    it('Renders correctly when loaded.', () => {
        expect(wrapper.find('header')).toHaveLength(1);
        expect(wrapper.find('div.NavigationBar')).toHaveLength(1);
        expect(wrapper.find('a').props()).toHaveProperty('href', '/');
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper.find('img').props()).toHaveProperty('alt', 'Inventory Application Logo');
        expect(wrapper.find('div.NavigationContainer')).toHaveLength(1);
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h1').text()).toEqual('Inventory Application');
    });

});