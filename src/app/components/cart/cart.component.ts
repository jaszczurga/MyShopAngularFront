import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  constructor(private cartService: CartService) {
  }
  ngOnInit() {
    this.updateCartStatus();
  }


  private updateCartStatus() {
    //subscribe to the cart totalPrice

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }
}
