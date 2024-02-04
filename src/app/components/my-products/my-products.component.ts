import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit{

  productCategories: ProductCategory[]=[];

  //numberOfProducts: number = 0;


  constructor(private productService: ProductService) {
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
}
