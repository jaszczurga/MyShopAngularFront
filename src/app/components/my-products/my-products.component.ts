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

  //get recent list of products from service
  subscribeToCategories() {
    this.productService.refreshListOfRecentCategories();
    this.productService.ListOfRecentCategories.subscribe(
      data => {
        this.productCategories = data;
      }
    )
  }


  private listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data.content;
      }
    )
  }


  deleteCategoryById(id: number) {
    this.productService.deleteCategoryById(id).subscribe(
      data => {
       // console.log('Product Categories=' + JSON.stringify(data));
        this.subscribeToCategories();
      }
    )

  }


  //save category
  saveCategory(theCategory : CategoryDto) {
    this.productService.saveCategory(theCategory).subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.subscribeToCategories();
      }
    )
  }

  updateCategory(theCategory : CategoryDto,id: string) {
    this.productService.updateCategory(theCategory,id).subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.subscribeToCategories();
      }
    )
  }


  category: CategoryDto = new CategoryDto(1, "test");
  openDialogAddNewCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {categoryName: ""},
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

  openDialogUpdateCategory(categoryName :string,id: number): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {categoryName: categoryName},
    });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.category.categoryName = result;
        console.log(this.category);

        if(this.category.categoryName != "" && this.category.categoryName != null) {
            this.updateCategory(this.category, String(id));
        }
      });
    }



}
