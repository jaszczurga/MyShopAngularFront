import {Product} from "./product";
import {CartItem} from "./cart-item";

export class OrderItem {
  quantity!: number;
  unitPrice!: number;
  product!: Product;

  constructor(cartItem: CartItem) {
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.product = cartItem.product;
  }


}
