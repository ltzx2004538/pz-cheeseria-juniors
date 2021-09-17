export class Account {
	private readonly  id: string
	private readonly title: string
	private readonly description: string
	private readonly category: string
	private readonly image: string

	constructor(id: string,title : string,description : string,category: string,image: string){
		this.id = id,
		this.title = title,
		this.description = description,
		this.category = category,
		this.image = image
	}
  }
