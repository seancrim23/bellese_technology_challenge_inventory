import React from 'react';
import InventoryItem from './InventoryItem/InventoryItem';
import classes from './InventoryList.module.css';

const InventoryList = props => {

    const inventory = props.inventory.length === 0 ? <tr><td>No items currently in the inventory! Use the add item form above to add some new items!</td></tr> :
        <div>random</div>;

    return (
        <table className={classes.InventoryList}>
            <tbody>
                {inventory}
            </tbody>
        </table>
    );
};

export default InventoryList;