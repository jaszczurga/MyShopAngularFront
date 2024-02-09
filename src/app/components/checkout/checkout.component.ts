import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];


  storage: Storage = sessionStorage;


  cardElement: any;
  displayError: any = '';

  isDisabled: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router : Router) {
  }

  ngOnInit() {



  }


}
