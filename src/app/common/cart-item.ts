export class CartItem {
  id!:number;
  name!:string;
  unitPrice!:number;
  quantity!:number;
  product: any;
  constructor(id: number,
              name: string,
              unitPrice: number,
              quantity: number,
              product: any) {
  }
}
