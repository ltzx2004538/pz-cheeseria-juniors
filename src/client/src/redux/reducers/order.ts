import { IOrder } from "../../interfaces/cart";
import {OrderAction} from '../types/order';

const initialState = {
	orders: undefined
};

export default (state = initialState, action: OrderAction) => {
	switch (action.type) {
		case 'SET_ORDER':
			const {payload} = action;
			return {...state, orders: payload};
		default:
			return state;
	}
}