import { takeLatest, call} from 'redux-saga/effects';
import {requestCreateOrder} from '../../../services/order';

function* createOrder(action: any) {
	try {
		const response = yield call(requestCreateOrder,action.payload);
		if (response.status === 200) {
			console.log("success")
			return Promise.resolve(response.data);
		}
		else {
			return Promise.reject(response.data);
		}
	}
	catch {
		console.log("error")
	}
}

export default function* watchCreateOrder() {
	yield takeLatest('CREATE_ORDER', createOrder);
}