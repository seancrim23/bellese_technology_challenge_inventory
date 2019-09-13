import React from 'react';
import classes from './SelectedItem.module.css';

const SelectedItem = props => {
    return (
        <div className={classes.SelectedItem}>
            <div className={classes.SelectedItemContent}>
                <h3>View / Modify</h3>
                <span onClick={props.closeItem} className={classes.CloseItem}>&times;</span>
                <form onSubmit={props.editItem} className={classes.EditForm} id={props.selectItem.id} encType="multipart/form-data" >
                    <label>
                        Name: <input className={classes.NameInput} type="text" name="name" defaultValue={props.selectItem.name} />
                    </label>
                    <label>
                        Description: <input type="text" className={classes.DescriptionInput} name="description" defaultValue={props.selectItem.description} />
                    </label>
                    <label>
                        Current Image: <img className={classes.CurrentImage} alt={props.selectItem.description} style={{"width": "50px", "height": "50px"}} src={props.selectItem.imageData} />
                    </label>
                    <label>
                        Change Image: <input className={classes.ChangeImageInput} type="file" name="image"/>
                    </label>
                    <input className={classes.EditInput} type="submit" value="EDIT" />
                </form>
            </div>
        </div>
    );
};

export default SelectedItem;