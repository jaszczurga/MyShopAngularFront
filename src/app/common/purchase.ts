import {Customer} from "./customer";
import {Address} from "./address";
import {Order} from "./order";

export class Purchase {
  customer!: Customer;
  address!: Address;
  order!: Order;
  orderItems!: OrderItem[];
}
