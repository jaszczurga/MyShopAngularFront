import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {ProductCategory} from "../../common/product-category";
import {ProductDto} from "../../dto/product-dto";
import {CategoryDto} from "../../dto/category-dto";

@Component({
  selector: 'app-my-products-more-info-about-category',
  templateUrl: './my-products-more-info-about-category.component.html',
  styleUrl: './my-products-more-info-about-category.component.css'
})
export class MyProductsMoreInfoAboutCategoryComponent implements OnInit{

  products: Product[] = [];
  productCategories: ProductCategory[]=[];
  currentCategoryId: number=1;
  currentCategoryName: string='';
  previousCategoryId: number=1;
  theTotalElements: number = 0;



  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;




  constructor(private productService: ProductService,
              private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListProducts();});
    this.listProductCategories();
   // this.setCurrentCategoryName();
  }

  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId){
      //get the "id" param string. convert string to a number using the "+" symbol
      //used ! to tell typescript that we know for sure that the id parameter is available
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    //check if we have a different category than previous
    //note: Angular will reuse a component if it is currently being viewed
    //if we have a different category id than previous, then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=1;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    //now get the products for the given category id
    this.productService.getProductListPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        this.processResult2()
      );
  }

  private processResult2() {
    return (data: any) => {
      this.products=data.content;
      //page number starts from 1 in the backend, but in the frontend it starts from 0
      this.thePageNumber=data.pageable.pageNumber+1;
      this.thePageSize=data.pageable.pageSize;
      this.theTotalElements=data.numberOfElements;
    }
  }

  private processResult() {
    return (data: any) => {
      this.products=data._embedded.products;
      //page number starts from 1 in the backend, but in the frontend it starts from 0
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data.content;
      }
    )
  }

  // private setCurrentCategoryName() {
  //   const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
  //   if (hasCategoryId){
  //     //get the "id" param string. convert string to a number using the "+" symbol
  //     //used ! to tell typescript that we know for sure that the id parameter is available
  //     this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  //     this.productService.getCategoryNameById(this.currentCategoryId).subscribe(
  //       data => {
  //         console.log('Product Categories=' + JSON.stringify(data));
  //         this.currentCategoryName = data.categoryName;
  //       }
  //     )
  //   }
  //   else{
  //     //not category id available ... default to category id 1
  //     this.currentCategoryId = 1;
  //   }
  // }

  changeCategoryName(product: Product, id: number, categoryId: number) {

    //create product dto
    const productDto = new ProductDto(product.id, product.productName, product.productDescription, product.productPrice, product.productStockQuantity, product.productImage, new CategoryDto(categoryId, ''));

    //product.categoryId=categoryId;
    this.productService.updateProductCategory(productDto,id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
      }
    )
  }

  deleteProductById(id: number) {

    this.productService.deleteProductById(id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
      }
    )

  }
}