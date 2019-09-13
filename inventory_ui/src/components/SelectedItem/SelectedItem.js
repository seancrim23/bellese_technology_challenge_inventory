import React from 'react';
import classes from './SelectedItem.module.css';

const SelectedItem = props => {
    return (
        <div className={classes.SelectedItem}>
            <div className={classes.SelectedItemContent}>
                <span onClick={props.closeItem} className={classes.CloseItem}>&times;</span>
                <div id={props.selectItem.id}>
                    <label>
                        Name: <input type="text" name="name" defaultValue={props.selectItem.name} />
                    </label>
                    <label>
                        Description: <input type="text" name="description" defaultValue={props.selectItem.description} />
                    </label>
                    <label>
                        Image: <input type="file" name="image" />
                    </label>
                    <button onClick={props.editItem}>EDIT</button>
                </div>
            </div>
        </div>
    );
};

export default SelectedItem;