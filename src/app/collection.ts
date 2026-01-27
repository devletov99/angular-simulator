class Collection<T> {

  collection: T[] = [];
	
  constructor(collection: T[]) {
		this.collection = collection;
	}

	getAll(): T[] {
	  return this.collection;
	}

	getElement(index: number): T {
		return this.collection[index];
	}

	clearCollection(): void {
    	this.collection = [];
	}

	removeElement(index: number): void {
		this.collection.splice(index, 1);
	}

	replaceElement(index: number, newElement: T): void {
    this.collection.splice(index, 1, newElement);
	}
}

const products: string[] = ['яблоки', 'банана', 'груши', 'мандарин']
const number: number[] = [1, 2, 3, 4, 5]

const productss: Collection<string> = new Collection<string>(products)
const numberr: Collection<number> = new Collection<number>(number)