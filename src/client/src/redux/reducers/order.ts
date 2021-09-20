import {OrderAction} from '../types/order';
import {ORDER_STATUS} from '../../utils/constant';

const initialState = {
	orders: undefined,
	isOrderReceived: ORDER_STATUS.PENDING
};

export default (state = initialState, action: OrderAction) => {
	switch (action.type) {
		case 'SET_ORDER':
			const { payload } = action;
			return {...state, orders: payload};
		case 'ORDER_RECEIVED':
			const status = action.payload;
			return{...state, isOrderReceived: status}
		default:
			return state;
	}
}