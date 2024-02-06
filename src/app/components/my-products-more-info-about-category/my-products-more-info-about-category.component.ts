import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {ProductCategory} from "../../common/product-category";
import {ProductDto} from "../../dto/product-dto";
import {CategoryDto} from "../../dto/category-dto";
import {AddCategoryDialogComponent} from "../add-category-dialog/add-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";

@Component({
  selector: 'app-my-products-more-info-about-category',
  templateUrl: './my-products-more-info-about-category.component.html',
  styleUrl: './my-products-more-info-about-category.component.css'
})
export class MyProductsMoreInfoAboutCategoryComponent implements OnInit{

  products: Product[] = [];
  productCategories: ProductCategory[]=[];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  theTotalElements: number = 0;



  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 50;




  constructor(private productService: ProductService,
              private route:ActivatedRoute,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleListProducts();});
    this.subscribeToProducts();
    //this.listProductCategories();
   // this.setCurrentCategoryName();
  }

  //get recent list of products from service
  subscribeToProducts() {
    this.productService.refreshListOfRecentProducts(0,50,79);
    this.productService.ListOfRecentProducts.subscribe(
      data => {
        this.products = data;
      }
    )
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

  private processResult() {
    return (data: any) => {
      this.products=data.content;
      //page number starts from 1 in the backend, but in the frontend it starts from 0
      this.thePageNumber=data.pageable.pageNumber+1;
      this.thePageSize=data.pageable.pageSize;
      this.theTotalElements=data.numberOfElements;
    }
  }



  deleteProductById(id: number) {

    this.productService.deleteProductById(id).subscribe(
      data => {
        //console.log(data);
        this.subscribeToProducts()
      }
    )
  }

  saveProduct(product: ProductDto) {
    this.productService.saveProduct(product).subscribe(
      data => {
        console.log("produkt zapisany");
        this.subscribeToProducts()
      }
    )
  }

  updateProduct(product: ProductDto, id: string) {
    this.productService.updateProduct(product,id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.subscribeToProducts()
      }
    )
  }



product: ProductDto = new ProductDto(1, "test", "test", 1, 1, "test", new CategoryDto(1, "choose category"));
  openDialogAddNewProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {
        ProductName: "",
        ProductDescription: "",
        ProductImageUrl: "",
        ProductPrice: "",
        ProductStock: "",
        Category: this.product.category,
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      this.product.productName = result.ProductName;
      this.product.productDescription = result.ProductDescription;
      this.product.productImage = result.ProductImageUrl;
      this.product.productPrice = result.ProductPrice;
      this.product.productStockQuantity = result.ProductStock;
      this.product.category = new ProductCategory(result.Category.id, result.Category.categoryName,[]);
      console.log(this.product);
      if(this.product.productName != "" && this.product.productName != null) {
        this.saveProduct(this.product);
      }
    });
  }

  openDialogEditProduct(id:number,product:ProductDto): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {
        ProductName: product.productName,
        ProductDescription: product.productDescription,
        ProductImageUrl: product.productImage,
        ProductPrice: product.productPrice,
        ProductStock: product.productStockQuantity,
        Category: product.category,
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      this.product.productName = result.ProductName;
      this.product.productDescription = result.ProductDescription;
      this.product.productImage = result.ProductImageUrl;
      this.product.productPrice = result.ProductPrice;
      this.product.productStockQuantity = result.ProductStock;
      this.product.category = new ProductCategory(result.Category.id, result.Category.categoryName,[]);
      console.log(this.product);
      if(this.product.productName != "" && this.product.productName != null) {
        this.updateProduct(this.product, String(id));
      }
    });
  }

}
