import React, { useState } from 'react';
import classes from './NewItemForm.module.css';

const NewItemForm = props => {
    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    
    function checkCanSubmitHandler(event) {
        const inputParent = event.currentTarget.parentNode.parentNode;
        const childValues = [];
        for(var i = 0; i < 3; i++){
            childValues.push(inputParent.childNodes[i].childNodes[1].value);
        }
        const submitIsReady = childValues.every(value => value !== "");
        setSubmitDisabled(!submitIsReady);
    };

    return (
        <div className={classes.NewItemForm}>
            <h2>Add a new item!</h2>
            <form onSubmit={props.submitNewItem} >
                <label>
                    Name: <input type="text" name="name" onChange={checkCanSubmitHandler}/>
                </label>
                <label>
                    Description: <input type="text" name="description" onChange={checkCanSubmitHandler}/>
                </label>
                <label>
                    Image: <input type="file" name="image" onChange={checkCanSubmitHandler} accept=".gif,.jpg,.jpeg,.png"/>
                </label>
                    <input type="submit" value="Submit" disabled={submitDisabled} />
            </form>
        </div>
    );
};

export default NewItemForm;