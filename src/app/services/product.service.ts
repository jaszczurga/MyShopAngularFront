import {Injectable, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
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
    const searchUrl = `http://localhost:8080/api/action/productsByCategoryId?categoryId=${theCategoryId}&page=${thePage}&size=${thePageSize}`

    //new version of api
    return this.httpClient.get<GetResponseProductsModel>(searchUrl);
  }

  //method to get products by keyword from backend for search component
  searchProductsPaginate( thePage: number,
                          thePageSize: number,
                          theKeyword: string ): Observable<GetResponseProductsModel> {
    ///////////////////////////search component new version of api////////////////////////
    const searchUrl = `http://localhost:8080/api/action/productsContainingName?name=${theKeyword}&page=${thePage}&size=${thePageSize}`
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

  //get product by id
  getProductById(id: string): Observable<Product> {
    const searchUrl = `http://localhost:8080/api/action/product/${id}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  //save new category to db
  saveCategory(theCategory: CategoryDto): Observable<CategoryDto> {
    return this.httpClient.post<CategoryDto>("http://localhost:8080/api/action/saveCategory", theCategory);
  }

  //update existing category name in db
  updateCategory(theCategory: CategoryDto,id:string): Observable<CategoryDto> {
    return this.httpClient.patch<CategoryDto>(`http://localhost:8080/api/action/updateCategory/${id}`, theCategory);
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



