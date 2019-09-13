import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Navbar from '../../components/Navbar/Navbar';
import InventoryList from '../../components/InventoryList/InventoryList';
import NewItemForm from '../../components/NewItemForm/NewItemForm';
import SelectedItem from '../../components/SelectedItem/SelectedItem';
import classes from './Homepage.module.css';

const Homepage = props => {
    const [ uploadedImage, setUploadedImage ] = useState(null);
    const [ submitDisabled, setSubmitDisabled ] = useState(true);
    const [ showSelectedItem, setShowSelectedItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(null);

    const { getItems, itemList, addItem, editItem, deleteItem } = props;

    useEffect(() => {
        getItems();
    }, [getItems]);

    function newItemHandler(event){
        event.preventDefault(); 
        const fieldValues = [];
        for(var i = 0; i < 2; i++){
            fieldValues.push(event.target.childNodes[i].childNodes[1].value);
        }
        addItem({
            name: fieldValues[0],
            description: fieldValues[1],
            image: 'C:/Users/sean/Desktop/pics/no.png'
        });
    };

    function checkCanSubmitAndPictureHandler(event) {
        checkCanSubmitHandler(event);
        newPictureHandler(event);
    }

    function checkCanSubmitHandler(event) {
        const inputParent = event.currentTarget.parentNode.parentNode;
        const childValues = [];
        for(var i = 0; i < 3; i++){
            childValues.push(inputParent.childNodes[i].childNodes[1].value);
        }
        const submitIsReady = childValues.every(value => value !== "");
        setSubmitDisabled(!submitIsReady);
    };

    function newPictureHandler(event){
        var reader = new FileReader();
        var file = event.currentTarget.files[0];
        /*if(file){
            reader.readAsDataURL(file);
        }
        reader.onloadend = function() {
            setUploadedImage(reader.result);
        }*/
        setUploadedImage(file.name);
    }

    function deleteHandler(event) {
        deleteItem(event.currentTarget.parentNode.parentNode.id);
    }
    
    function openItemHandler(event) {
        if(!showSelectedItem){
            setSelectedItem({
                image: 'gonna update this one',
                name: event.currentTarget.parentNode.parentNode.childNodes[1].textContent,
                description: event.currentTarget.parentNode.parentNode.childNodes[2].textContent,
                id: event.currentTarget.parentNode.parentNode.id
            });
            setShowSelectedItem(true);
        };
    }

    function closeItemHandler(event){
        if(showSelectedItem){
            setShowSelectedItem(false);
            setSelectedItem({});
        }
    }

    function editHandler(event) {
        setShowSelectedItem(false);
        setSelectedItem({});
        editItem(event.currentTarget.parentNode.id, {
            name: event.currentTarget.parentNode.childNodes[0].childNodes[1].value,
            description: event.currentTarget.parentNode.childNodes[1].childNodes[1].value,
        });
    }

    const currentSelectedItem = showSelectedItem ? <SelectedItem editItem={editHandler} selectItem={selectedItem} closeItem={closeItemHandler} /> : null;

    return (
        <div className={classes.Homepage}>
            <Navbar/>
            <NewItemForm submitNewItem={newItemHandler} submitDisabledProp={submitDisabled} checkCanSubmit={checkCanSubmitHandler} uploadNewPicture={checkCanSubmitAndPictureHandler} />
            <InventoryList inventory={itemList} showItem={openItemHandler} deleteItem={deleteHandler} />
            {currentSelectedItem}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        itemList: state.inventory.inventoryList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (content) => dispatch(actions.addInventory(content)),
        getItems: () => dispatch(actions.getAllInventory()),
        editItem: (id, content) => dispatch(actions.editInventory(id, content)),
        deleteItem: (id) => dispatch(actions.deleteInventory(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);