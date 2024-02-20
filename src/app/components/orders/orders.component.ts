import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders-service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  ListOfOrders: any = [];
  protected roles: string ="";
  loggedIn: boolean = false;

constructor(private ordersService: OrdersService,
            private authService: AuthenticationService) {
  }



  ngOnInit(): void {
  this.loggedIn = this.authService.isLoggedIn();
    this.authService.CurrentUserRoles.subscribe(
      data => {
        console.log('dataRolesa=' + data);
        this.roles = data || '';

        if(this.roles.includes('ADMIN')){
          this.ordersService.getOrders().subscribe(
            data => {
              this.ListOfOrders = data.orders;
              console.log('ListOfOrders=' + JSON.stringify(data.orders));
            }
          )
        }else {
          this.ordersService.getOrdersByCustomerEmail().subscribe(
            data => {
              this.ListOfOrders = data.orders;
              console.log('ListOfOrders=' + JSON.stringify(data.orders));
            }
          )
        }
      }
    );
  }

}
