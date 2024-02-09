import {Product} from "./product";
import {ImageDto} from "../dto/image-dto";

export class CartItem {
  id!:number;
  name!:string;
  unitPrice!:number;
  quantity!:number;
  productImage!:ImageDto;
  product!: Product;
  constructor(product: Product) {
    this.id = product.id;
    this.name = product.productName;
    this.unitPrice = product.productPrice;
    this.quantity = 1;
    this.productImage = product.images![0];
  }
}
