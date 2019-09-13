import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Navbar from '../../components/Navbar/Navbar';
import InventoryList from '../../components/InventoryList/InventoryList';
import NewItemForm from '../../components/NewItemForm/NewItemForm';
import SelectedItem from '../../components/SelectedItem/SelectedItem';
import classes from './Homepage.module.css';

const Homepage = props => {
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
        let imageFormObj = new FormData();
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", event.currentTarget.childNodes[2].childNodes[1].files[0]);
        imageFormObj.append("name", fieldValues[0]);
        imageFormObj.append("description", fieldValues[1]);
        addItem(imageFormObj);
    };

    function checkCanSubmitHandler(event) {
        const inputParent = event.currentTarget.parentNode.parentNode;
        const childValues = [];
        for(var i = 0; i < 3; i++){
            childValues.push(inputParent.childNodes[i].childNodes[1].value);
        }
        const submitIsReady = childValues.every(value => value !== "");
        setSubmitDisabled(!submitIsReady);
    };

    function deleteHandler(event) {
        deleteItem(event.currentTarget.parentNode.parentNode.id);
    }
    
    function openItemHandler(event) {
        if(!showSelectedItem){
            setSelectedItem({
                imageData: event.currentTarget.parentNode.parentNode.childNodes[0].childNodes[0].src,
                name: event.currentTarget.parentNode.parentNode.childNodes[1].textContent,
                description: event.currentTarget.parentNode.parentNode.childNodes[2].textContent,
                id: event.currentTarget.parentNode.parentNode.id
            });
            setShowSelectedItem(true);
        };
    }

    function closeItemHandler(){
        if(showSelectedItem){
            setShowSelectedItem(false);
            setSelectedItem({});
        }
    }

    function editHandler(event) {
        event.preventDefault();
        setShowSelectedItem(false);
        setSelectedItem({});

        let imageFormObj = new FormData();
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        if(event.currentTarget.childNodes[3].childNodes[1].files[0]){
            imageFormObj.append("imageData", event.currentTarget.childNodes[3].childNodes[1].files[0]);
        }
        imageFormObj.append("name", event.currentTarget.childNodes[0].childNodes[1].value);
        imageFormObj.append("description", event.currentTarget.childNodes[1].childNodes[1].value);
        editItem(event.currentTarget.id, imageFormObj);
    }

    const currentSelectedItem = showSelectedItem ? <SelectedItem editItem={editHandler} selectItem={selectedItem} closeItem={closeItemHandler} /> : null;

    const error = props.itemError ? <h5>{props.itemError.message}</h5> : null;

    return (
        <div className={classes.Homepage}>
            <Navbar/>
            <NewItemForm submitNewItem={newItemHandler} submitDisabledProp={submitDisabled} checkCanSubmit={checkCanSubmitHandler} />
            {error}
            <InventoryList inventory={itemList} showItem={openItemHandler} deleteItem={deleteHandler} />
            {currentSelectedItem}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        itemList: state.inventory.inventoryList,
        itemError: state.inventory.error
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