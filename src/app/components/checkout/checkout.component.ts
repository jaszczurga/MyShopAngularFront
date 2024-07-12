import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {PaymentInfo} from "../../common/payment-info";
import {Purchase} from "../../common/purchase";
import {OrderItem} from "../../common/order-item";
import {SpaceValidate} from "../../validators/space-validate";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;



  storage: Storage = sessionStorage;

  stripe = Stripe(environment.stripePublicKey);

  paymentInfo : PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = '';

  isDisabled: boolean = false;

   statesInPoland: string[] = [
    'Dolnośląskie',
    'Kujawsko-Pomorskie',
    'Lubelskie',
    'Lubuskie',
    'Łódzkie',
    'Małopolskie',
    'Mazowieckie',
    'Opolskie',
    'Podkarpackie',
    'Podlaskie',
    'Pomorskie',
    'Śląskie',
    'Świętokrzyskie',
    'Warmińsko-Mazurskie',
    'Wielkopolskie',
    'Zachodniopomorskie'
  ];


  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router : Router) {
  }

  ngOnInit() {

    //set up Stripe form
    this.setupStripePaymentForm();

    //read the user's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);


    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          SpaceValidate.notOnlyWhitespace
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          SpaceValidate.notOnlyWhitespace
        ]),
        email: new FormControl(theEmail,[
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
         SpaceValidate.notOnlyWhitespace
        ]),
      }),
      Address: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
         SpaceValidate.notOnlyWhitespace
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          SpaceValidate.notOnlyWhitespace
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        country: new FormControl('', [
          Validators.required
        ]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          SpaceValidate.notOnlyWhitespace
        ])
      }),
      creditCard: this.formBuilder.group({
      })
    });

  }


  ///////////////////////////// getters for form controls /////////////////////////////
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email')
  }
get AddressStreet() {
  return this.checkoutFormGroup.get('Address.street')
}
  get AddressCity() {
    return this.checkoutFormGroup.get('Address.city')
  }
  get AddressState() {
    return this.checkoutFormGroup.get('Address.state')
  }
  get AddressCountry() {
    return this.checkoutFormGroup.get('Address.country')
  }
  get AddressZipCode() {
    return this.checkoutFormGroup.get('Address.zipCode')
  }





  onSubmit() {
    //console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //set up order
    let order = {
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice
    };

    //get cart items
    const cartItems = this.cartService.cartItems;

    //set up orderItems from cart cartItems
    let orderItems: any[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //set up purchase
    let purchase = new Purchase();

    //populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;


    //populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;
    purchase.address = this.checkoutFormGroup.controls['Address'].value;



    this.paymentInfo.amount = Math.round(this.totalPrice*100)
    this.paymentInfo.currency = 'PLN';
    this.paymentInfo.receiptEmail = purchase.customer.email;




    /////////////////////////// new Stripe payment ///////////////////////////
    //if valid form then
    // - create payment intent
    // - confirm card payment
    // - place order

    if(!this.checkoutFormGroup.invalid && this.displayError.textContent === ''){
      this.isDisabled = true;
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse)=>{
          //this is Stripe apis method to confirm card payment we send this directly to stripe server
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,{
            payment_method:{
              card: this.cardElement,
              billing_details: {
                email: purchase.customer.email,
                name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                address: {
                  country: this.AddressCountry!.value.code
                }
              }
            }
          },{
            handleActions: false
          }).then((result:any)=>{
            if(result.error){
              //inform the customer there was an error
              alert(`there was an err: ${result.error.message}`)
              this.isDisabled = false;
            }else{
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
                  this.resetCart()
                  this.isDisabled = false;
                },
                error: (err: any) =>{
                  alert(`there was an error ${err.message}`)
                  this.isDisabled = false;
                }
              })
            }
          })
        });
    }else{
      this.checkoutFormGroup.markAllAsTouched()
      return;
    }



  }


  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName)!;
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

  }

  private reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  private resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    //clear the cart from storage
    //localStorage.removeItem('cartItems');
    //we can do it in better way
    this.cartService.persistCartItems();


    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  private setupStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // Create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // Add an instance of card UI component into the 'card-element' div
    this.cardElement.mount('#card-element');

    //add event binding for the change event to the card element
    this.cardElement.on('change', (event: any) => {
      //get a handle to card-errors element
      this.displayError = document.getElementById('card-errors');
      if(event.complete){
        this.displayError!.textContent = '';
      }else if(event.error){
        this.displayError!.textContent = event.error.message;
      }
    });


  }


  countriesInEU: string[] = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
    'Republic of Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Poland',
    'Portugal',
    'Romania',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden'
  ];
}
