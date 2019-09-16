import React from 'react';
import InventoryItem from './InventoryItem/InventoryItem';
import classes from './InventoryList.module.css';

const InventoryList = props => { 

    var inventory = null;

    if(props.inventory.length === 0){
        inventory = <tr><td className={classes.NoItems}>No items currently in the inventory! Use the add item form above to add some new items!</td></tr>;
    } else {
        inventory = props.inventory.map(item => {
            return <InventoryItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                data={item.imageData}
                show={props.showItem}
                delete={props.deleteItem}
                />;
        });
    }

    return (
        <table className={classes.InventoryList}>
            <tbody>
                {inventory}
            </tbody>
        </table>
    );
};

export default InventoryList;