import {Order} from '../models/order';
import { CartItem } from '../models/cartItem';
import { OrderRepository } from '../repository/OrderRepository';
import { InMemoryOrderRepository } from '../repository/InMemoryOrderRepository';
import {checkAllNumber} from '../utils/validation';

interface OrderService {
	getOrders(): OrderResponse,
	addOrder(items: Array<CartItem>,totalPrice: number): Order | InvalidResponse,
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

	addOrder(items: Array<CartItem>, totalPrice: number): Order | InvalidResponse{
		let id = 1;
		const totalOrder = this.getOrders();
		try {
			if(!checkAllNumber(items)){
				const result = {status: 400, data: "invalid data"}
				return result;
			}
			if (totalOrder.data.length && totalOrder.status != 400) {
				id = totalOrder.data.length + 1;
			}
			const order = new Order(id.toString(), items, totalPrice);
			const result = this.repository.addOrder(order);
			return result
		}
		catch(err) {
			return {
				status: 500,
				data: "something wrong"
			}
		}
	}
}