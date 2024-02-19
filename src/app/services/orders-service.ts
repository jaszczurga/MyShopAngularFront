import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) { }


  // get all orders

public getOrders() {
    return this.httpClient.get<OrderResponse>('http://localhost:8080/api/orders/allOrders')

}
}



export interface OrderResponse {
  orders: Order[];
}


export interface Order {
  id: number;
  orderTrackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: string | null;
  dateCreated: string;
  lastUpdated: string;
  customer: Customer;
  orderItems: OrderItem[];
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  state: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  imageUrl: string | null;
  unitPrice: number;
  dateDelivered: string | null;
}
