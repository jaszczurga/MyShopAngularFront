import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {ProductCategory} from "../common/product-category";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../common/product";
import {ProductDto} from "../dto/product-dto";
import {CategoryDto} from "../dto/category-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  categoryUrl = environment.springBootApiUrlhttp + "/productCategories";
  productUrl = environment.springBootApiUrlhttp + "/products";
  actionApiUrl = environment.springBootApiUrlhttp + "/action";

  ListOfRecentProducts: Subject<Product[]> = new BehaviorSubject<Product[]>([]);



  //method to refresh acutal list of the recent products
  refreshListOfRecentProducts(thePage: number,
                              thePageSize: number,
                              theCategoryId: number) {
    let receivedProductsDtoModel = this.getProductListPaginate(thePage, thePageSize, theCategoryId);

    receivedProductsDtoModel.subscribe(data => {
      this.ListOfRecentProducts.next(data.content);
    });
  }

  constructor( private httpClient: HttpClient ) {
  }


  //method to get product categories from backend for product list page menu
  getProductCategories(): Observable<GetResponseProductCategoryModel> {


    //TODO add pagination to this url not necessary but still
    return this.httpClient.get<GetResponseProductCategoryModel>("http://localhost:8080/api/action/categories?page=0&size=10");

  }

  getProductListPaginate( thePage: number,
                          thePageSize: number,
                          theCategoryId: number ): Observable<GetResponseProductsModel> {

    //new version of api
    const searchUrl = this.actionApiUrl + `/productsByCategoryId?categoryId=${theCategoryId}&page=${thePage}&size=${thePageSize}`

    //new version of api
    return this.httpClient.get<GetResponseProductsModel>(searchUrl);
  }

  //method to get products by keyword from backend for search component
  searchProductsPaginate( thePage: number,
                          thePageSize: number,
                          theKeyword: string ): Observable<GetResponseProductsModel> {
    ///////////////////////////search component new version of api////////////////////////
    const searchUrl = this.actionApiUrl + `/productsContainingName?name=${theKeyword}&page=${thePage}&size=${thePageSize}`
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
    return this.httpClient.patch<Product>(  this.actionApiUrl +`/updateProduct/${id}`, theProduct);
  }

  //method to delete product by id
  deleteProductById(id: number): Observable<any> {
    return this.httpClient.delete(  this.actionApiUrl +`/deleteProduct/${id}`);
  }

  //delete category by id
  deleteCategoryById(id: number): Observable<any> {
    return this.httpClient.delete(  this.actionApiUrl +`/deleteCategory/${id}`);
  }

  //get number of products in category
  getNumberOfProductsInCategory(theCategoryId: number): Observable<number> {
    const searchUrl =   this.actionApiUrl +`/numberOfProducts/${theCategoryId}`;
    return this.httpClient.get<number>(searchUrl);
  }

  //get product by id
  getProductById(id: string): Observable<Product> {
    const searchUrl =  this.actionApiUrl + `/product/${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  //save new category to db
  saveCategory(theCategory: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>(  this.actionApiUrl +"/saveCategory", theCategory);
  }

  //update existing category name in db
  updateCategory(theCategory: CategoryDto,id:string): Observable<CategoryDto> {
    return this.httpClient.patch<CategoryDto>(  this.actionApiUrl +`/updateCategory/${id}`, theCategory);
  }

  //method to save product to db
  saveProduct(theProduct: ProductDto): Observable<ProductDto> {
    return this.httpClient.post<ProductDto>(  this.actionApiUrl +"/saveProduct", theProduct);
  }

  //method to update product
  updateProduct(theProduct: ProductDto,id: string): Observable<ProductDto> {
    return this.httpClient.patch<ProductDto>(  this.actionApiUrl +`/updateProduct/${id}`, theProduct);
  }


}

//create interface to unwrap the json from spring data rest _embedded entry
interface GetResponseProductCategory{
  _embedded: {
    productCategories: ProductCategory[];
  }
}

interface GetResponseProductCategoryModel{
  content: ProductCategory[];
  pageable: {
    pageSize: number,
    pageNumber: number,
  },
  numberOfElements: number,
}

interface GetResponseProductCategory{
  "id": number,
  "categoryName": string
}


interface GetResponseProductsModel{
  content: Product[];
  pageable: {
    pageSize: number,
    pageNumber: number,
  },
  numberOfElements: number,
}



