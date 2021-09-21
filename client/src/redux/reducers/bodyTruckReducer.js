import * as actionTypes from '../constants/bodyTruckConstants';
//Get All body truck
export const getBodyTruck = (state = { bodyTruck: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_BODY_TRUCK_REQUEST:
			return { loading: true };
		case actionTypes.GET_BODY_TRUCK_SUCCESS:
			return { ...state, bodyTruck: [...action.payload], loading: false };
		case actionTypes.GET_BODY_TRUCK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Create body truck
export const createTruck = (state = { bodyTruck: [] }, action) => {
	switch (action.type) {
		case actionTypes.POST_BODY_TRUCK_REQUEST:
			return { loading: true };
		case actionTypes.POST_BODY_TRUCK_SUCCESS:
			return {
				...state,
				bodyTruck: [...state.bodyTruck, action.payload],
				loading: false,
			};
		case actionTypes.POST_BODY_TRUCK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Edit body truck
export const updateTruck = (state = { bodyTruck: [] }, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_BODY_TRUCK_REQUEST:
			return { loading: true };
		case actionTypes.UPDATE_BODY_TRUCK_SUCCESS:
			return {
				...state,
				bodyTruck: state.bodyTruck.map(x =>
					x._id === action.payload._id ? action.payload : x,
				),
				loading: false,
			};
		case actionTypes.UPDATE_BODY_TRUCK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

//Delete body truck
export const deleteTruck = (state = { bodyTruck: [] }, action) => {
	switch (action.type) {
		case actionTypes.DELETE_BODY_TRUCK_REQUEST:
			return { loading: true };
		case actionTypes.DELETE_BODY_TRUCK_SUCCESS:
			return {
				...state,
				bodyTruck: state.bodyTruck.filter(e => e._id !== action.payload),
				loading: false,
			};
		case actionTypes.DELETE_BODY_TRUCK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
