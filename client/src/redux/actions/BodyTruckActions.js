import * as actionTypes from '../constants/bodyTruckConstants';
import axios from 'axios';

//Get All truck
export const getAllTruck = () => async dispatch => {
	try {
		dispatch({ type: actionTypes.GET_BODY_TRUCK_REQUEST });

		const { data } = await axios.get('/bodytruck/');

		dispatch({
			type: actionTypes.GET_BODY_TRUCK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_BODY_TRUCK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Create a truck
export const createTruck = data => async dispatch => {
	try {
		dispatch({ type: actionTypes.POST_BODY_TRUCK_REQUEST });

		const { inputDate } = await axios.post(`/bodytruck/`, data);

		dispatch({
			type: actionTypes.POST_BODY_TRUCK_SUCCESS,
			payload: inputDate,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.POST_BODY_TRUCK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//Edit a truck
export const editTruck = data => async dispatch => {
	try {
		dispatch({ type: actionTypes.UPDATE_BODY_TRUCK_REQUEST });

		const { editData } = await axios.put(`/bodytruck/${data._id}`, data);

		dispatch({
			type: actionTypes.UPDATE_BODY_TRUCK_SUCCESS,
			payload: editData,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.UPDATE_BODY_TRUCK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Delete a truck
export const deleteTruck = id => async dispatch => {
	try {
		dispatch({ type: actionTypes.DELETE_BODY_TRUCK_REQUEST });

		const { data } = await axios.delete(`/bodytruck/${id}`);

		dispatch({
			type: actionTypes.DELETE_BODY_TRUCK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.DELETE_BODY_TRUCK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
