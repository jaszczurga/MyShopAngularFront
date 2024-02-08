import {Product} from "./product";

export class OrderItem {
  quantity!: number;
  unitPrice!: number;
  product!: Product;
}
