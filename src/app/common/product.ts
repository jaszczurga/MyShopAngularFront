export class Product {
  constructor(public id: number,
              public productName: string,
              public productDescription: string,
              public productPrice: number,
              public productStockQuantity: number,
              public productImage: string,
              public categoryId:number) {}
}
