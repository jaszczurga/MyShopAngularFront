import {OrderDto} from "./order-dto";

export class OrderResponse {
  orderDto: OrderDto[];
  constructor(orderDto: OrderDto[]) {
    this.orderDto = orderDto;
  }
}
