import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductCategory} from "../../common/product-category";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ImageService} from "../../services/image.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";
import {ProductDto} from "../../dto/product-dto";

@Component({
  selector: 'app-product-content-details',
  templateUrl: './product-content-details.component.html',
  styleUrl: './product-content-details.component.css'
})
export class ProductContentDetailsComponent implements OnInit{

  public product: Product = new Product(1, "Product 1", "This is a product", 100, 100, [], new ProductCategory(1, "Category 1",new Array())) ;
  quantity: number = 1;
    constructor(private productService: ProductService,
                private route:ActivatedRoute,
                private imageService: ImageService,
                private cartService: CartService) {
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
  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.productName}, ${this.quantity}`);
    const theCartItem = new CartItem(product);
    theCartItem.quantity = this.quantity;
    console.log(theCartItem.quantity);
    this.cartService.addToCart(theCartItem);
  }

  protected readonly Number = Number;
}
