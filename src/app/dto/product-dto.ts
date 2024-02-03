import {CategoryDto} from "./category-dto";

export class ProductDto {
  id: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStockQuantity: number;
  productImage: string;
  category: CategoryDto;
  constructor(id: number, productName: string, productDescription: string, productPrice: number, productStockQuantity: number, productImage: string, category: CategoryDto) {
    this.id = id;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productStockQuantity = productStockQuantity;
    this.productImage = productImage;
    this.category = category
  }
}
