import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders-service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  ListOfOrders: any = [];

constructor(private ordersService: OrdersService) {
  }



  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(
      data => {
        this.ListOfOrders = data.orders;
        console.log('ListOfOrders=' + JSON.stringify(data.orders));
      }
    )
  }

}
