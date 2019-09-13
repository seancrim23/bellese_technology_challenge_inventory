import React from 'react';
import { shallow } from 'enzyme';
import SelectedItem from './SelectedItem';

describe('Testing the <SelectedItem /> component', () => {

    const mockSelectedItemData = {
        imageData: 'mock_imageData.jpg',
        name: 'mock name',
        description: 'mock description',
        id: 'mock id'
    };
    const mockEditHandler = jest.fn();
    const mockCloseItemHandler = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SelectedItem editItem={mockEditHandler} selectItem={mockSelectedItemData} closeItem={mockCloseItemHandler} />);
    });

    it('Renders <SelectedItem /> correctly when mocked values and functions are passed in.', () => {
        expect(wrapper.find('div.SelectedItem')).toHaveLength(1);
        expect(wrapper.find('div.SelectedItemContent')).toHaveLength(1);
        expect(wrapper.find('h3').text()).toEqual('View / Modify');
        expect(wrapper.find('span.CloseItem')).toHaveLength(1);
        expect(wrapper.find('form.EditForm').props()).toHaveProperty('encType', 'multipart/form-data');
        expect(wrapper.find('input.NameInput').props()).toHaveProperty('defaultValue', mockSelectedItemData.name);
        expect(wrapper.find('input.DescriptionInput').props()).toHaveProperty('defaultValue', mockSelectedItemData.description);
        expect(wrapper.find('img.CurrentImage').props()).toHaveProperty('src', mockSelectedItemData.imageData);
        expect(wrapper.find('img.CurrentImage').props()).toHaveProperty('alt', mockSelectedItemData.description);
        expect(wrapper.find('input.ChangeImageInput').props()).toHaveProperty('name', 'image');
        expect(wrapper.find('input.EditInput').props()).toHaveProperty('value', 'EDIT');
    });

});