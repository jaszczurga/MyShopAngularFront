import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";
import {ImageService} from "../../services/image.service";
import {ImageDto} from "../../dto/image-dto";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.css'
})
export class AddProductDialogComponent implements OnInit{

  categories: ProductCategory[] = [];



  ngOnInit() {
    this.getAllCategories();
  }

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  //get all categories
  getAllCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data.content;
      }
    )
  }

  onFileChanged($event: Event) {
//select file
    //this.data.Images.push(this.imageService.onFileChanged($event).name);
    this.imageService.onFileChanged($event)
  }

  onUpload(productId:number) {
    //this.imageService.onUpload(productId);
  }
}

export interface DialogData {
  ProductName: string;
  ProductDescription: string;
  //ProductImageUrl: string;
  ProductPrice: number;
  ProductStock: number;
  Category: ProductCategory;
  Images: ImageDto[];
}
