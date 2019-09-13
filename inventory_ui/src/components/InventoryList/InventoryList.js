import React from 'react';
import InventoryItem from './InventoryItem/InventoryItem';
import classes from './InventoryList.module.css';

const InventoryList = props => {

    /*
            <tr key={props._id}>
            <td><img src={`data:${props.image.contentType};base64,${props.image.data}`} /></td>
            <td>props.name</td>
            <td>props.description</td>
            <td><button onClick={props.edit}>EDIT</button></td>
            <td><button onClick={props.delete}>DELETE</button></td>
        </tr>
            /*
    0:
description: "this is a test item"
image: {data: {…}, contentType: "image/jpg"}
name: "test item 1"
__v: 0
_id: "5d7a80d52514b427d892732b"
    */ 

    var inventory = null;

    if(props.inventory.length === 0){
        inventory = <tr><td>No items currently in the inventory! Use the add item form above to add some new items!</td></tr>;
    } else {
        inventory = props.inventory.map(item => {
            return <InventoryItem
                key={item._id}
                id={item._id}
                name={item.name}
                contentType={item.image.contentType}
                description={item.description}
                data={item.image.data}
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