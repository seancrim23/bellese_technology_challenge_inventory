import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import InventoryList from '../../components/InventoryList/InventoryList';
import NewItemForm from '../../components/NewItemForm/NewItemForm';
import classes from './Homepage.module.css';

const Homepage = props => {

    function newItemHandler(event){
        event.preventDefault(); 
        const fieldValues = [];
        for(var i = 0; i < 3; i++){
            fieldValues.push(event.target.childNodes[i].childNodes[1].value);
        }
        console.log(fieldValues);
        console.log({
            name: fieldValues[0],
            description: fieldValues[1],
            image: fieldValues[2]
        });
    };

    function deleteHandler(event) {
        console.log('hey i want to delete something');
    }

    function editHandler(event) {
        console.log('hey i want to edit this one');
    }

    return (
        <div className={classes.Homepage}>
            <Navbar/>
            <NewItemForm submitNewItem={newItemHandler} />
            <InventoryList inventory={[]} editItem={editHandler} deleteItem={deleteHandler} />
        </div>
    );
};

export default Homepage;