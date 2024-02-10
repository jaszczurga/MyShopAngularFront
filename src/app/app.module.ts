import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductCategoryOffCanvaComponent } from './components/product-category-off-canva/product-category-off-canva.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/product/product.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import { MyProductsMoreInfoAboutCategoryComponent } from './components/my-products-more-info-about-category/my-products-more-info-about-category.component';
import { ProductContentDetailsComponent } from './components/product-content-details/product-content-details.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import {MatOption, MatSelect} from "@angular/material/select";
import { ImageManagerComponent } from './components/image-manager/image-manager.component';
import { CartComponent } from './components/cart/cart.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent,OktaAuthGuard} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";
import myAppConfig from "./config/my-app-config";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {ProductService} from "./services/product.service";


const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth,injector: Injector) {
  //use injector to access any service available in app
  const router = injector.get(Router);
  //redirect the user to your custom login page
  router.navigate(['/login']);
}


const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'cart-details', component: CartDetailsComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'image-manager', component: ImageManagerComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'products', component: ProductComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'products/:id', component: ProductContentDetailsComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'category', component: ProductComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'search/:keyword', component: ProductComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'category/:id', component: ProductComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'my-products', component: MyProductsComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: 'my-products/:id', component: MyProductsMoreInfoAboutCategoryComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage}},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryOffCanvaComponent,
    ProductComponent,
    NavBarComponent,
    MyProductsComponent,
    MyProductsMoreInfoAboutCategoryComponent,
    ProductContentDetailsComponent,
    AddCategoryDialogComponent,
    AddProductDialogComponent,
    ImageManagerComponent,
    CartComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    [HttpClientModule],
    MatIcon,
    FormsModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,
    provideAnimationsAsync('noop'),
    {
      provide : OKTA_CONFIG,
      useValue : {oktaAuth}},
    {
      provide : HTTP_INTERCEPTORS, //this is a token that tells Angular we are providing an HTTP interceptor
      useClass : AuthInterceptorService, //this is the class that implements HttpInterceptor we created
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
