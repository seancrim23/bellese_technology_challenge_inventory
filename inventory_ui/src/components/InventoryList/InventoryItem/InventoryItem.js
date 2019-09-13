import React from 'react';
import classes from './InventoryItem.module.css';

const InventoryItem = props => {
    return (
        <tr className={classes.InventoryItem} id={props.id}>
            <td className={classes.InventoryData}><img alt={props.description} src={`/images/${props.data}`} /></td>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td><button className={classes.View} onClick={props.show}>VIEW / MODIFY</button></td>
            <td><button className={classes.Delete} onClick={props.delete}>DELETE</button></td>
        </tr>
    );  
};

export default InventoryItem;