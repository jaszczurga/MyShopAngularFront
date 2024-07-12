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
  files: File[] = [];



  ngOnInit() {
    this.getAllCategories();
    this.getCurrentlyAddedFiles();
  }

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  onNoClick(): void {
    //console.log(this.data);
    this.imageService.selectedFile$.next([]);
    this.dialogRef.close();
  }

  //get all categories
  getAllCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.categories = data.content;
      }
    )
  }

  //getCurrentlyAddedFiles
  getCurrentlyAddedFiles() {
    this.imageService.selectedFile$.subscribe(
      data => {
        this.files = data;
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

  deleteFromCurrentFiles(name: string) {
    console.log('deleting file with name: ' + name);
    this.imageService.selectedFile$.next(this.files.filter(file => file.name !== name));
    this.getCurrentlyAddedFiles();
  }

  deleteFromCurrentImages(id: number) {
    console.log('deleting image with id: ' + id);
    //deleting images form product with id
    this.data.Images = this.data.Images.filter(image => image.id !== id);
    this.imageService.deleteImageById(id)
    this.productService.refreshListOfRecentProducts(0,50,this.data.Category.id);
    this.productService
  }

  protected readonly Number = Number;
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
