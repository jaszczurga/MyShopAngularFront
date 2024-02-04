import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-off-canva',
  templateUrl: './product-category-off-canva.component.html',
  styleUrl: './product-category-off-canva.component.css'
})
export class ProductCategoryOffCanvaComponent implements OnInit{

    productCategories: ProductCategory[]=[];


      constructor(private productService: ProductService) {
      }

      ngOnInit(): void {
        this.listProductCategories();
      }

  private listProductCategories() {
        this.productService.getProductCategories().subscribe(
          data => {
            console.log('Product Categories=' + JSON.stringify(data));
            this.productCategories = data.content;
          }
        )
  }
}
