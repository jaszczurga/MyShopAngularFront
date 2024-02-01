import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  searchMode: boolean = false;

  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string ="";

    constructor(private productService: ProductService,
                private route:ActivatedRoute) {
    }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();});
  }

  protected listProducts() {
    this.searchMode= this.route.snapshot.paramMap.has('keyword');
    console.log("searchMode="+this.searchMode);
    if (this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    //this.handleListProducts();
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
        this.processResult()
      );
  }

  updatePageSize(pageSize: string) {
    this.thePageSize= +pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }


  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);


    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      this.processResult()
    );
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


}
