
export class Order {
	private readonly  id: string
	private readonly cheeses: Array<number>
	private readonly amount: number

	constructor(id: string, cheeses : Array<number>, amount: number){
		this.id = id,
		this.cheeses = cheeses,
		this.amount = amount
	}
  }



