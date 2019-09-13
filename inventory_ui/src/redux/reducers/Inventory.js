import * as actionTypes from '../actionTypes';

const initialState = {
    inventoryList: [],
    error: null,
    isGettingInventory: false,
    isEditingInventory: false,
    isDeletingInventory: false,
    isAddingInventory: false
};

export default function inventoryReducer(state = initialState, action) {
    switch(action.type){
        case actionTypes.GET_ALL_INVENTORY:
            return {
                ...state,
                error: null,
                isGettingInventory: true
            };
        case actionTypes.GET_ALL_INVENTORY_SUCCESS:
            return {
                ...state,
                inventoryList: action.results.data,
                isGettingInventory: false
            };
        case actionTypes.GET_ALL_INVENTORY_FAIL:
            return {
                ...state,
                error: action.error,
                isGettingInventory: false
            };
        case actionTypes.EDIT_INVENTORY:
            return {
                ...state,
                error: null,
                isEditingInventory: true
            };
        case actionTypes.EDIT_INVENTORY_SUCCESS:
            const copiedInventoryArray = [...state.inventoryList];
            const editItemIndex = copiedInventoryArray.findIndex(item => item._id === action.result.data._id);

            copiedInventoryArray[editItemIndex].name = action.result.data.name;
            copiedInventoryArray[editItemIndex].description = action.result.data.description;
            copiedInventoryArray[editItemIndex].imageData = action.result.data.imageData;
            copiedInventoryArray[editItemIndex].imageName = action.result.data.imageName;

            return {
                ...state,
                inventoryList: copiedInventoryArray,
                isEditingInventory: false
            };
        case actionTypes.EDIT_INVENTORY_FAIL:
            return {
                ...state,
                error: action.error,
                isEditingInventory: false
            };
        case actionTypes.DELETE_INVENTORY:
            return {
                ...state,
                error: null,
                isDeletingInventory: true
            };
        case actionTypes.DELETE_INVENTORY_SUCCESS:
            const copiedInventoryList = [...state.inventoryList];
            const removeItemIndex = copiedInventoryList.findIndex(item => item._id === action.result.data._id);
            copiedInventoryList.splice(removeItemIndex, 1);

            return {
                ...state,
                inventoryList: copiedInventoryList,
                isDeletingInventory: false
            };
        case actionTypes.DELETE_INVENTORY_FAIL:
            return {
                ...state,
                error: action.error,
                isDeletingInventory: false
            };
        case actionTypes.ADD_INVENTORY:
            return {
                ...state,
                error: null,
                isAddingInventory: true
            };
        case actionTypes.ADD_INVENTORY_SUCCESS:
            return {
                ...state,
                inventoryList: [...state.inventoryList, action.result.data],
                isAddingInventory: false
            };
        case actionTypes.ADD_INVENTORY_FAIL:
            return {
                ...state,
                error: action.error,
                isAddingInventory: false
            }
        default:
            return state;
    }
};