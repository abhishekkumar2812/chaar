import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems =() => dispatch => {
	console.log("get");
	dispatch(setItemsLoading());
	axios
		.get('http://localhost:5000/api/items')
		//.get('/api/items')
		.then(res => 
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			}))
};

export const deleteItem =(id) => dispatch =>{
	//console.log("3");
	axios
		.delete(`http://localhost:5000/api/items/${id}`)
		.then(res => 
			dispatch({
				type: DELETE_ITEM,
				payload: id
			}))
};

export const addItem =(item) => dispatch => {
	console.log("add");
	axios
		.post('http://localhost:5000/api/items', item)
		.then(res => 
			dispatch({
				type: ADD_ITEM,
				payload: res.data
			}))
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
}