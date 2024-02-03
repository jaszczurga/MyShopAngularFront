import {Injectable, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {ProductCategory} from "../common/product-category";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../common/product";
import {ProductDto} from "../dto/product-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  categoryUrl = environment.springBootApiUrlhttp + "/productCategories";
  productUrl = environment.springBootApiUrlhttp + "/products";



  constructor(private httpClient: HttpClient) { }


  //method to get product categories from backend for product list page menu
  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

  //method to get products by category id from backend for product list page
  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId: number): Observable<GetResponseProducts> {

    //need to build URL based on category id and page size
    const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //method to get products by keyword from backend for search component
  searchProductsPaginate(thePage:number,
                         thePageSize:number,
                         theKeyword: string): Observable<GetResponseProducts> {

    //need to build URL based on keyword  and page size
    const searchUrl = `${this.productUrl}/search/findByProductNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //get category name by id
  getCategoryNameById(theCategoryId: number): Observable<GetResponseProductCategory> {
    const searchUrl = `http://localhost:8080/api/productCategories/${theCategoryId}`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl);
  }

  //update products category
  updateProductCategory(theProduct: ProductDto,id: number): Observable<Product> {
    console.log('theProduct=' + JSON.stringify(theProduct));
    return this.httpClient.patch<Product>(`http://localhost:8080/api/action/updateProduct/${id}`, theProduct);
  }



}

//create interface to unwrap the json from spring data rest _embedded entry
interface GetResponseProductCategory{
  _embedded: {
    productCategories: ProductCategory[];
  }
}

interface GetResponseProductCategory{
  "id": number,
  "categoryName": string
}

//create interface to unwrap the json from spring data rest _embedded entry
interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
