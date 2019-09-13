import React from 'react';
import classes from './NewItemForm.module.css';

const NewItemForm = props => {
    return (
        <div className={classes.NewItemForm}>
            <h2>Add a new item!</h2>
            <form onSubmit={props.submitNewItem} encType="multipart/form-data" >
                <label>
                    Name: <input type="text" name="name" onChange={props.checkCanSubmit}/>
                </label>
                <label>
                    Description: <input type="text" name="description" onChange={props.checkCanSubmit}/>
                </label>
                <label>
                    Image: <input type="file" name="image" onChange={props.checkCanSubmit} accept=".gif,.jpg,.jpeg,.png"/>
                </label>
                    <input type="submit" value="Submit" disabled={props.submitDisabledProp} />
            </form>
        </div>
    );
};

export default NewItemForm;