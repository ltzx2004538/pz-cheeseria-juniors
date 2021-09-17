import {Cheese} from './cheese';

export class Order {
	private readonly  id: string
	private readonly cheeses: Array<Cheese>
	private readonly amount: number

	constructor(id: string, cheeses : Array<Cheese>, amount: number){
		this.id = id,
		this.cheeses = cheeses,
		this.amount = amount
	}
  }



