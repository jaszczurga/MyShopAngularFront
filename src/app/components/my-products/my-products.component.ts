import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryDialogComponent} from "../add-category-dialog/add-category-dialog.component";
import {CategoryDto} from "../../dto/category-dto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit{

  productCategories: ProductCategory[]=[];



  constructor(private productService: ProductService,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listProductCategories();
   // this.getNumberOfProductsForCategory(1);
  }

  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data.content;
      }
    )
  }


  deleteCategoryById(id: number) {
    this.productService.deleteCategoryById(id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    )

  }

  //get number od products for category
  getNumberOfProductsForCategory(id: number) {
    this.productService.getNumberOfProductsInCategory(id).subscribe(
      data => {
        console.log('Number of products for category=' + JSON.stringify(data));
      }
    )
  }

  //save category
  saveCategory(theCategory : CategoryDto) {
    this.productService.saveCategory(theCategory).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
      }
    )
  }

  updateCategory(theCategory : CategoryDto,id: string) {
    this.productService.updateCategory(theCategory,id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
      }
    )
  }


  category: CategoryDto = new CategoryDto(1, "test");
  openDialogAddNewCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {Categoryname: ""},
    });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.category.categoryName = result;
        console.log(this.category);
        if(this.category.categoryName != "" && this.category.categoryName != null) {
          this.saveCategory(this.category);
        }
      });


  }

  openDialogUpdateCategory(CategoryName :string,id: number): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {Categoryname: CategoryName},
    });
    if(this.category.categoryName != ""){
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.category.categoryName = result;
        console.log(this.category);
        this.updateCategory(this.category, String(id));
      });
    }
  }


}
