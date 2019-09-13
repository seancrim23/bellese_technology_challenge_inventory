import * as actionTypes from '../actionTypes';
import axios from 'axios';

export function getAllInventory(){
    return dispatch => {
        dispatch(gettingInventory());
        axios({
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            url: `http://localhost:3001/items`
        })
        .then(response => {
            dispatch(getInventorySuccess(response));
        })
        .catch(error => {
            dispatch(getInventoryFail(error));
        })
    };
};

function gettingInventory() {
    return { type: actionTypes.GET_ALL_INVENTORY };
};

function getInventorySuccess(results) {
    return { type: actionTypes.GET_ALL_INVENTORY_SUCCESS, results };
};

function getInventoryFail(error) {
    return { type: actionTypes.GET_ALL_INVENTORY_FAIL, error };
};

export function editInventory(itemId, updatedValues){
    return dispatch => {
        dispatch(editingInventory());
        axios({
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            data: updatedValues,
            url: `http://localhost:3001/items/${itemId}`
        })
        .then(response => {
            dispatch(editInventorySuccess(response));
        })
        .catch(error => {
            dispatch(editInventoryFail(error));
        })
    };
};

function editingInventory(){
    return { type: actionTypes.EDIT_INVENTORY };
};

function editInventorySuccess(result){
    return { type: actionTypes.EDIT_INVENTORY_SUCCESS, result };
};

function editInventoryFail(error){
    return { type: actionTypes.EDIT_INVENTORY_FAIL, error };
};

export function deleteInventory(itemId){
    return dispatch => {
        dispatch(deletingInventory());
        axios({
            method: 'DELETE',
            url: `http://localhost:3001/items/${itemId}`
        })
        .then(response => {
            dispatch(deleteInventorySuccess(response));
        })
        .catch(error => {
            dispatch(deleteInventoryFail(error));
        })
    };
};

function deletingInventory(){
    return { type: actionTypes.DELETE_INVENTORY };
};

function deleteInventorySuccess(result) {
    return { type: actionTypes.DELETE_INVENTORY_SUCCESS, result };
};

function deleteInventoryFail(error) {
    return { type: actionTypes.DELETE_INVENTORY_FAIL, error };
};

export function addInventory(content){
    return dispatch => {
        dispatch(addingInventory());
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: content,
            url: `http://localhost:3001/items`
        })
        .then(response => {
            dispatch(addInventorySuccess(response));
        })
        .catch(error => {
            dispatch(addInventoryFail(error));
        })
    };
};

function addingInventory(){
    return { type: actionTypes.ADD_INVENTORY };
};

function addInventorySuccess(result) {
    return { type: actionTypes.ADD_INVENTORY_SUCCESS, result };
};

function addInventoryFail(error) {
    return { type: actionTypes.ADD_INVENTORY_FAIL, error };
};