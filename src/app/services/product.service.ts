import {Injectable, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {ProductCategory} from "../common/product-category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  categoryUrl = 'http://localhost:8080/api/productCategories';



  constructor(private httpClient: HttpClient) { }


  //method to get product categories from backend for product list page menu
  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

}

//create interface to unwrap the json from spring data rest _embedded entry
interface GetResponseProductCategory{
  _embedded: {
    productCategories: ProductCategory[];
  }
}
