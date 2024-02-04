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
                         theCategoryId: number): Observable<GetResponseProductsModel> {

    //need to build URL based on category id and page size
    // const searchUrl = `${this.productUrl}/search/findByCategoryId?id=${theCategoryId}`
    //   + `&page=${thePage}&size=${thePageSize}`;

    //new version of api
    const searchUrl = `http://localhost:8080/api/action/productsByCategoryId?categoryId=${theCategoryId}&page=${thePage}&size=${thePageSize}`

   // return this.httpClient.get<GetResponseProducts>(searchUrl);
    //new version of api
    return this.httpClient.get<GetResponseProductsModel>(searchUrl);
  }

  //method to get products by keyword from backend for search component
  searchProductsPaginate(thePage:number,
                         thePageSize:number,
                         theKeyword: string): Observable<GetResponseProductsModel> {

    //need to build URL based on keyword  and page size
    ///////////////////////////search component old version of api////////////////////////
    // const searchUrl = `${this.productUrl}/search/findByProductNameContaining?name=${theKeyword}`
    //   + `&page=${thePage}&size=${thePageSize}`;

    ///////////////////////////search component new version of api////////////////////////
    const searchUrl = `http://localhost:8080/api/action/productsContainingName?name=${theKeyword}&page=${thePage}&size=${thePageSize}`

    //old version of api
   // return this.httpClient.get<GetResponseProducts>(searchUrl);

      //new version of api
      return this.httpClient.get<GetResponseProductsModel>(searchUrl);

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

  //method to delete product by id
  deleteProductById(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/action/deleteProduct/${id}`);
  }

  //delete category by id
  deleteCategoryById(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/api/action/deleteCategory/${id}`);
  }

  //get number of products in category
  getNumberOfProductsInCategory(theCategoryId: number): Observable<number> {
    const searchUrl = `http://localhost:8080/api/action/numberOfProducts/${theCategoryId}`;
    return this.httpClient.get<number>(searchUrl);
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

interface GetResponseProductsModel{
  content: Product[];
  pageable: {
    pageSize: number,
    pageNumber: number,
  },
  numberOfElements: number,
}

