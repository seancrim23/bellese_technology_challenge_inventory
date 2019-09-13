import React from 'react';
import classes from './InventoryItem.module.css';
import placeholder from '../../../assets/images/nice_truck.jpg';

const InventoryItem = props => {
    return (
        <tr id={props.id}>
            <td className={classes.InventoryData}><img alt={props.description} src={placeholder} /></td>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td><button onClick={props.show}>VIEW</button></td>
            <td><button onClick={props.delete}>DELETE</button></td>
        </tr>
    );  
};

export default InventoryItem;