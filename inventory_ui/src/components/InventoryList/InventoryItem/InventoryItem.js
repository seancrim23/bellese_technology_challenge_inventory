import React from 'react';
import classes from './InventoryItem.module.css';

const InventoryItem = props => {
    return (
        <tr>
            <td>IMAGE</td>
            <td>NAME</td>
            <td>DESCRIPTION</td>
            <td><button onClick={props.edit}>EDIT</button></td>
            <td><button onClick={props.delete}>DELETE</button></td>
        </tr>
    );  
};

export default InventoryItem;