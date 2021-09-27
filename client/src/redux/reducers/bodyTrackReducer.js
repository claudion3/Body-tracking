import * as actionTypes from '../constants/bodyTrackConstants';
//Get All body track
export const getBodyTrack = (state = { bodyTrack: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_BODY_TRACK_REQUEST:
			return { loading: true };
		case actionTypes.GET_BODY_TRACK_SUCCESS:
			return { ...state, bodyTrack: [...action.payload], loading: false };
		case actionTypes.GET_BODY_TRACK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Create body track
export const createTrack = (state = { bodyTrack: [] }, action) => {
	switch (action.type) {
		case actionTypes.POST_BODY_TRACK_REQUEST:
			return { loading: true };
		case actionTypes.POST_BODY_TRACK_SUCCESS:
			return {
				...state,
				bodyTrack: [...state.bodyTruck, action.payload],
				loading: false,
			};
		case actionTypes.POST_BODY_TRACK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Edit body track
export const updateTrack = (state = { bodyTrack: [] }, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_BODY_TRACK_REQUEST:
			return { loading: true };
		case actionTypes.UPDATE_BODY_TRACK_SUCCESS:
			return {
				...state,
				bodyTrack: state.bodyTrack.map(x =>
					x._id === action.payload._id ? action.payload : x,
				),
				loading: false,
			};
		case actionTypes.UPDATE_BODY_TRACK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Delete body track
export const deleteTrack = (state = { bodyTrack: [] }, action) => {
	switch (action.type) {
		case actionTypes.DELETE_BODY_TRACK_REQUEST:
			return { loading: true };
		case actionTypes.DELETE_BODY_TRACK_SUCCESS:
			return {
				...state,
				bodyTrack: state.bodyTrack.filter(e => e._id !== action.payload),
				loading: false,
			};
		case actionTypes.DELETE_BODY_TRACK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
