import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductCategoryOffCanvaComponent } from './components/product-category-off-canva/product-category-off-canva.component';
import {HttpClientModule} from "@angular/common/http";
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




const routes: Routes = [
  {path: 'products', component: ProductComponent},
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
  ],
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    [HttpClientModule],
    MatIcon
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
