import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	getBodyTruck,
	createTruck,
	deleteTruck,
	updateTruck,
} from './reducers/bodyTruckReducer';
const reducer = combineReducers({
	getAllTruck: getBodyTruck,
	createBdTruck: createTruck,
	editBdTruck: updateTruck,
	deleteBdTruck: deleteTruck,
});

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
