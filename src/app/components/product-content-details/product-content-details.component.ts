import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductCategory} from "../../common/product-category";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-product-content-details',
  templateUrl: './product-content-details.component.html',
  styleUrl: './product-content-details.component.css'
})
export class ProductContentDetailsComponent implements OnInit{

  public product: Product = new Product(1, "Product 1", "This is a product", 100, 100, [], new ProductCategory(1, "Category 1",new Array())) ;

    constructor(private productService: ProductService,
                private route:ActivatedRoute,
                private imageService: ImageService) {
    }

    ngOnInit(): void {
      this.getProductById(this.route.snapshot.paramMap.get('id')!);
    }

    public getProductById(id: string){
      this.productService.getProductById(id).subscribe(
        data => {
          this.product = data;
          this.listImagesForProduct(this.product.id);
        }
      )
    }


  images: any[] = [];
  listImagesForProduct(id: number) {
    this.imageService.getImagesOfProduct(id).subscribe(
      data => {
        this.images = data;
        console.log("images=iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        console.log(this.images);
      }
    );
  }


}
