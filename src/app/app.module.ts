import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductCategoryOffCanvaComponent } from './components/product-category-off-canva/product-category-off-canva.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/product/product.component';
import {RouterModule, Routes} from "@angular/router";
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
import {JwtInterceptor} from "./configuration/jwt-interceptor";
import { RegisterComponent } from './components/register/register.component';





const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'image-manager', component: ImageManagerComponent},
  {path: 'products', component: ProductComponent},
  {path: 'products/:id', component: ProductContentDetailsComponent},
  {path: 'category', component: ProductComponent},
  {path: 'search/:keyword', component: ProductComponent},
  {path: 'category/:id', component: ProductComponent},
  {path: 'my-products', component: MyProductsComponent},
  {path: 'my-products/:id', component: MyProductsMoreInfoAboutCategoryComponent},
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
    RegisterComponent,
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
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync('noop'),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
