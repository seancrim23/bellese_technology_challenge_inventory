import React from 'react';
import { shallow } from 'enzyme';
import NewItemForm from './NewItemForm';

describe('Testing the <NewItemForm /> component.', () => {

    const mockSubmitNewItem = jest.fn();
    const mockCheckCanSubmit = jest.fn();
    const mockInputDisabled = false;

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NewItemForm submitNewItem={mockSubmitNewItem} submitDisabledProp={mockInputDisabled} checkCanSubmit={mockCheckCanSubmit} />);
    });

    it('Renders the <NewItemForm /> correctly when the mocked values and functions are passed in.', () => {
        expect(wrapper.find('div.NewItemForm')).toHaveLength(1);
        expect(wrapper.find('h2')).toHaveLength(1);
        expect(wrapper.find('h2').text()).toEqual('Add a new item!');
        expect(wrapper.find('form').props()).toHaveProperty('encType', 'multipart/form-data');
        expect(wrapper.find('input.NameInput').props()).toHaveProperty('onChange', mockCheckCanSubmit);
        expect(wrapper.find('input.DescriptionInput').props()).toHaveProperty('onChange', mockCheckCanSubmit);
        expect(wrapper.find('input.ImageInput').props()).toHaveProperty('onChange', mockCheckCanSubmit);
        expect(wrapper.find('input.ImageInput').props()).toHaveProperty('accept', ".gif,.jpg,.jpeg,.png");
        expect(wrapper.find('input.SubmitInput').props()).toHaveProperty('disabled', mockInputDisabled);
    });

    it('Renders the <NewItemForm /> with the SubmitInput input element having disabled property as true when mockInputDisabled is set to true', () => {
        wrapper.setProps({ submitDisabledProp: !mockInputDisabled });
        expect(wrapper.find('input.SubmitInput').props()).toHaveProperty('disabled', !mockInputDisabled);
    });



});