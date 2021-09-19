import {Order} from '../models/order';
import { OrderRepository } from '../repository/OrderRepository';
import { InMemoryOrderRepository } from '../repository/InMemoryOrderRepository';
import {checkAllNumber} from '../utils/validation';

interface OrderService {
	getOrders(): OrderResponse,
	addOrder(cheeses: Array<number>,amount: number): Order | InvalidResponse,
}

interface OrderResponse {
	status: number
	data: Array<Order> | string
}

interface InvalidResponse {
	status: number
	data: string
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
				data: "not found"
			}
		}
	}

	addOrder(cheeses: Array<number>, amount: number): Order | InvalidResponse{
		let id = 1;
		const totalOrder = this.getOrders();
		if(!checkAllNumber(cheeses)) {
			const result = {status: 400, data: "invalid data"}
			return result;
		}
		if (totalOrder.data.length && totalOrder.status != 400) {
			id = totalOrder.data.length + 1;
		}
		const order = new Order(id.toString(), cheeses, amount);
		const result = this.repository.addOrder(order);
		return result
	}
}