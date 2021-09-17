export class Cheese {
	private readonly id: number
	private readonly title: string
	private readonly description: string
	private readonly category: string
	private readonly image: string

	constructor(id: number,title : string,description : string,category: string,image: string){
		this.id = id,
		this.title = title,
		this.description = description,
		this.category = category,
		this.image = image
	}
  }
