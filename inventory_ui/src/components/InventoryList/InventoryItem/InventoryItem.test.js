import React from 'react';
import { shallow } from 'enzyme';
import InventoryItem from './InventoryItem';

describe('Testing the <InventoryItem /> component.', () => {

    const TEST_ID = 'test_id';
    const TEST_DESC = 'test_desc';
    const TEST_DATA = 'test_data.jpg';
    const TEST_NAME = 'test_name';
    const MOCK_SHOW_HANDLER = jest.fn();
    const MOCK_DELETE_HANDLER = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<InventoryItem/>);
    });

    it('Renders the <InventoryItem /> component correctly when passed in the correct mocked properties.', () => {
        wrapper.setProps({ id: TEST_ID, name: TEST_NAME, description: TEST_DESC, data: TEST_DATA, show: MOCK_SHOW_HANDLER, delete: MOCK_DELETE_HANDLER });
        expect(wrapper.find('tr.InventoryItem').props()).toHaveProperty('id', TEST_ID);
        expect(wrapper.find('img.Image').props()).toHaveProperty('alt', TEST_DESC);
        expect(wrapper.find('img.Image').props()).toHaveProperty('src', `/images/${TEST_DATA}`);
        expect(wrapper.find('td.Name').text()).toEqual(TEST_NAME);
        expect(wrapper.find('td.Description').text()).toEqual(TEST_DESC);
        expect(wrapper.find('button.View').props()).toHaveProperty('onClick', MOCK_SHOW_HANDLER);
        expect(wrapper.find('button.Delete').props()).toHaveProperty('onClick', MOCK_DELETE_HANDLER);
    });
    
});