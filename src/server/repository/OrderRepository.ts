import { Cheese } from '../models/cheese';
import {Order} from '../models/order';

export interface OrderRepository {
	getOrders(): Order[]
	addOrder(order: Order): Order
}



