import {ProductCategory} from "./product-category";

export class Product {

  constructor(public id: number,
              public productName: string,
              public productDescription: string,
              public productPrice: number,
              public productStockQuantity: number,
              public productImage: string,
              public category:ProductCategory) {}

}
