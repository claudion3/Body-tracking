import * as actionTypes from '../constants/bodyTrackConstants';
import axios from 'axios';

//Get All track
export const getAllTrack = () => async dispatch => {
	try {
		dispatch({ type: actionTypes.GET_BODY_TRACK_REQUEST });

		const { data } = await axios.get('/bodytrack/');

		dispatch({
			type: actionTypes.GET_BODY_TRACK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.GET_BODY_TRACK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Create a track
export const createTrack = data => async dispatch => {
	try {
		dispatch({ type: actionTypes.POST_BODY_TRACK_REQUEST });

		const { inputDate } = await axios.post(`/bodytrack/`, data);

		dispatch({
			type: actionTypes.POST_BODY_TRACK_SUCCESS,
			payload: inputDate,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.POST_BODY_TRACK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//Edit a track
export const editTrack = data => async dispatch => {
	try {
		dispatch({ type: actionTypes.UPDATE_BODY_TRACK_REQUEST });

		const { editData } = await axios.put(`/bodytrack/${data._id}`, data);

		dispatch({
			type: actionTypes.UPDATE_BODY_TRACK_SUCCESS,
			payload: editData,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.UPDATE_BODY_TRACK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Delete a track
export const deleteTrack = id => async dispatch => {
	try {
		dispatch({ type: actionTypes.DELETE_BODY_TRACK_REQUEST });

		const { data } = await axios.delete(`/bodytrack/${id}`);

		dispatch({
			type: actionTypes.DELETE_BODY_TRACK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.DELETE_BODY_TRACK_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
