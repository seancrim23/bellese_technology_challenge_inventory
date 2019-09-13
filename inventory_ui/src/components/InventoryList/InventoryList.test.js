import React from 'react';
import { shallow } from 'enzyme';
import InventoryList from './InventoryList';
import InventoryItem from './InventoryItem/InventoryItem';

describe('Testing the <InventoryList /> component.', () => {
    /*
    <InventoryList inventory={itemList} showItem={openItemHandler} deleteItem={deleteHandler} />

                return <InventoryItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                data={item.imageData}
                show={props.showItem}
                delete={props.deleteItem}
                />;
    */ 
   
    const staticTestItemListWithData = [
        {
            _id: 'test id 1',
            name: 'test name 1',
            description: 'test description 1',
            imageData: 'test imageData 1'
        },
        {
            _id: 'test id 2',
            name: 'test name 2',
            description: 'test description 2',
            imageData: 'test imageData 2'
        }
    ];
    const mockOpenItemHandler = jest.fn();
    const mockDeleteHandler = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<InventoryList inventory={[]} showItem={mockOpenItemHandler} deleteItem={mockDeleteHandler} />);
    });

    it('Renders 2 <InventoryItem /> components when we pass the staticTestItemListWithData', () => {
        wrapper.setProps({ inventory: staticTestItemListWithData });
        expect(wrapper.find(InventoryItem)).toHaveLength(2);
    });

    it('Renders 0 <InventoryItem /> components when we pass an empty dataset', () => {
        expect(wrapper.find(InventoryItem)).toHaveLength(0);
    });

    it('Renders one <tr /> element that contains a <td /> with an expected message when we pass an empty dataset', () => {
        expect(wrapper.find('tr')).toHaveLength(1);
        expect(wrapper.find('td.NoItems').text()).toEqual('No items currently in the inventory! Use the add item form above to add some new items!');
    });

    it('Renders NO <tr /> element that contains a <td /> with an expected message when we pass the staticTestItemListWithData', () => {
        wrapper.setProps({ inventory: staticTestItemListWithData });
        expect(wrapper.find('tr')).toHaveLength(0);
    });

});