
import { CartItem } from "./cartItem";

export class Order {
	private readonly  id: string
	private readonly items: Array<CartItem>
	private readonly totalPrice: number

	constructor(id: string, items : Array<CartItem>, totalPrice: number){
		this.id = id,
		this.items = items,
		this.totalPrice = totalPrice
	}
  }



