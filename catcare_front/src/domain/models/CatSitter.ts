export interface CatSitter {
  id: number
  name: string
  jobDesc: string
  price: number
}

export interface CatSitter2 extends CatSitter {
  address: string
}
