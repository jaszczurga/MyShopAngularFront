import {Customer} from "./customer";
import {Address} from "./address";
import {Order} from "./order";
import {OrderItem} from "./order-item";

export class Purchase {
  customer!: Customer;
  address!: Address;
  order!: Order;
  orderItems!: OrderItem[];
}
