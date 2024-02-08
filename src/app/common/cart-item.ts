import {Product} from "./product";

export class CartItem {
  id!:number;
  name!:string;
  unitPrice!:number;
  quantity!:number;
  product!: any;
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.productName;
    this.unitPrice = product.productPrice;
    this.quantity = 1;
    this.product = product;
  }
}
