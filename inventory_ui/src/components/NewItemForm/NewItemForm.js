import React from 'react';
import classes from './NewItemForm.module.css';

const NewItemForm = props => {
    return (
        <div className={classes.NewItemForm}>
            <h2>Add a new item!</h2>
            <form onSubmit={props.submitNewItem} encType="multipart/form-data" >
                <label>
                    Name: <input className={classes.NameInput} type="text" name="name" onChange={props.checkCanSubmit}/>
                </label>
                <label>
                    Description: <input className={classes.DescriptionInput} type="text" name="description" onChange={props.checkCanSubmit}/>
                </label>
                <label>
                    Image: <input className={classes.ImageInput} type="file" name="image" onChange={props.checkCanSubmit} accept=".gif,.jpg,.jpeg,.png"/>
                </label>
                    <input className={classes.SubmitInput} type="submit" value="Submit" disabled={props.submitDisabledProp} />
            </form>
        </div>
    );
};

export default NewItemForm;