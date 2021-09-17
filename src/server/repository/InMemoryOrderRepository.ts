import {Order} from '../models/order';
import {OrderRepository} from './OrderRepository';

let saveOrders: Array<Order> = []

export class InMemoryOrderRepository implements OrderRepository {

	getOrders(): Array<Order> {
		if(saveOrders.length){
			return saveOrders;
		}
	}

	addOrder(order: Order): Order{
		saveOrders.push(order);
		return order;
	}
}

