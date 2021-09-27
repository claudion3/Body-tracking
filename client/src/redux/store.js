import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	getBodyTrack,
	createTrack,
	deleteTrack,
	updateTrack,
} from './reducers/bodyTrackReducer';
const reducer = combineReducers({
	getAllTrack: getBodyTrack,
	createBdTrack: createTrack,
	editBdTrack: updateTrack,
	deleteBdTrack: deleteTrack,
});

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
