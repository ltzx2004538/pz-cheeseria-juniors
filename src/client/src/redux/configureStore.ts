import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from "redux-saga";
import order from './reducers/order';
import rootSaga from './sagas/root';

const reducer = combineReducers({
	order: order
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer,{},applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;

