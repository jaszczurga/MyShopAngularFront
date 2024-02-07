import {CategoryDto} from "./category-dto";
import {ImageDto} from "./image-dto";

export class ProductDto {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStockQuantity: number;
  //productImage: string;
  category: CategoryDto;
  images: ImageDto[];
  constructor(id: number, productName: string, productDescription: string, productPrice: number, productStockQuantity: number, productImage: string, category: CategoryDto, images: ImageDto[]) {
    this.id = id;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productStockQuantity = productStockQuantity;
    //this.productImage = productImage;
    this.category = category
    this.images = images;
  }
}
