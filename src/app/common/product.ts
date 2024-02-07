import {ProductCategory} from "./product-category";
import {ImageDto} from "../dto/image-dto";

export class Product {
  public images?: ImageDto[];

  constructor(public id: number,
              public productName: string,
              public productDescription: string,
              public productPrice: number,
              public productStockQuantity: number,
              //public productImage: string,
               images: any[],
              public category:ProductCategory) {}

  setImages(images: any[]) {
    this.images = images;
  }

}
