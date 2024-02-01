import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCategoryOffCanvaComponent } from './components/product-category-off-canva/product-category-off-canva.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCategoryOffCanvaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [HttpClientModule]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
