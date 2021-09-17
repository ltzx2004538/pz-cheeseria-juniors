import {Order} from '../models/order';
import { OrderRepository } from '../repository/OrderRepository';
import { InMemoryOrderRepository } from '../repository/InMemoryOrderRepository';

interface OrderService {
	getOrders(): OrderResponse,
	addOrder(cheeses: Array<number>,amount: number): Order,
}

interface OrderResponse {
	status: number
	data: Array<Order>
}

export class OrderServiceImpl implements OrderService {
	private readonly repository: OrderRepository

	constructor() {
		this.repository = new InMemoryOrderRepository()
	}

	getOrders(): OrderResponse{
		const orders = this.repository.getOrders();
		if(orders) {
			return {
				status: 200,
				data: orders
			}
		}
		else {
			return {
				status: 400,
				data: []
			}
		}
	}

	addOrder(cheeses: Array<number>,amount: number): Order {
		let id = 1;
		const totalOrder = this.getOrders();
		if (totalOrder.data.length) {
			id = totalOrder.data.length + 1;
		}
		const order = new Order(id.toString(),cheeses,amount);
		const result = this.repository.addOrder(order);
		return result
	}
}