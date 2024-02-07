import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  searchMode: boolean = false;

  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 50;
  theTotalElements: number = 0;

  previousKeyword: string ="";

    constructor(private productService: ProductService,
                private route:ActivatedRoute,
                private imageService: ImageService) {
    }

  image: string = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABWAFIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8RkOR7/WpYwdv+19ahVwByOakjk/I19Bc+sJoxgjOB3qzAhIGRyTVeORcjjt3q7aOjAAH5j0rKTtqyJS0uIY/Xp3prwYB649a+v8A/h1bqug/svad8Rda8QWdmusWouoLVeTEGGUV+eCQR0zivky/szZXctu2C8bbTj61z0sVCq2oPYyp1oz+FmZLHxwD+dQSA9M5rovE/gbVPClpZTX9jc2sepRmW2aRColUHBx+n51gMAT2rqjJvY3jqrpkEibVOCeKhYZHSrLckimYAQ9Oau7ZRB5fvRUuwUUCGIuRwKliXIFQrlu4FTx5B9RmoclazFa5peG/C994r1MWenWdxe3ZjaQQwxl3KqCScDngA5p9vAYm24IKdu/XFfpV/wAEkP2G7fVvAFj48m8PaxbeLbB5ZYHuQyW1/aSIVBQdCCucg4rlr/8A4Jn6V8Y/2+L7wx9ug0DRiG1TUY7aYNKiH7yRA5AYkj6DmvGea01UdJ9DieLgpuLL37F/w0+Kn7dHwHuPCEstvpOm6JbpDYXWoGSI3u5WMaoCPmA2dRXz98Z/+CYfxe+EF14ou9V8Oy3Fn4VuEF7dQHejo5G2RB95k564r9moPEdt4J0TRvht4QtDPfadp6CzuZYwEshCqhZnkAA+vHViMc16H8OvjNYH4lpoXjfSorXXtdtE8howZ7XVFRclUOOSD2I714tLMsPh6zoU5JTlry31t3PEp4mdNyq04PkPzG+J2t+Ef2qP2UfCRXTLQ+NPBcB0y2tIkUPfeZCq7scc7k7+tfml8Q/AusfDXxde6Rr2n3Ol6naOVmt50KvGevIr9a/26/hN4S/Yw+KR8bnUI11XXddkuofC80XlRR2xYlmUjGADjpkc9a+BP2+7tfi34/u/H8N5PMNUdQ1vM29rdVGFAcdQPevoMBWey2PVwVRtabHzgW5PX86QnilYhjkUgr1j1Bv4/rRR8tFA7G8njGGRP3umWMh9dpX+VWYPEekSjEujqPeOdhXMIcipYzyfSp5V0JZ9rfsg/wDBX/xb+y9ptvpNvdX9/odvH5Mdpd7LgRJtI2oxwyDnPHpWz+yF+1h4Lb9tu18beKPEE2m21/54aS9VlS2kdTtYupIHIx8wxXwtG+Dz2q1azH+XX/P6dK8yvl1FtySs2ccsLTcuZKzP6CfCHiSfxP4gtfG/haOw8WaPfW01hcCwuQ4uomIDBXGRuVlHPqK7n4GXd34u8SQ69ZaC2n2fgKO40+DTrtw9xKTtZ2STnntjnivh/wDYT/4LKeB/hF+z14e8E23gbxJJq+h6KI0SzgSSG9vIx8wGDnD5LknodwPY1teBv+CqnxD8B/C7Wby++Hyaf4kvLxrhlknd1bzV/wBaIwOAMjjPavicXlmFhi1jpQXtY+6nfoeJWnOlF0pS93scN/wX1+Nlz8cPHGgaNp50vUbWwsBe2ckXN3brNxJHMex3R/d9Oe+K/NHUdC8Rw2ZtpYb5rdTnZksv6HpXsf7QXh++1bS/7Va8c6hfk3M6SkiSR2Ys2B2PQ/ieK8KTxNqWnSFUvbmMqccOSK+xylqVBch6+Wyi6SsUrnRbu0zvtp1A7lDiqro0akEHp3GK2B481aMnF5KwPUMARQfHl8VJk+zSjGPmiFeteXU9LQxKK2j44fP/AB52P/fuineXYfu9jFibAqQNgmq+cVOhyKslkoPPrXQ+AfCtz448VWGlWkE9xcXkyx7IELuVzyQB6DJrno3BK17T+xV408N/DX4mTeIvEt00Ftpts4gjRNzzyv8AKMDp3NcWOnKNJuCu+hw4ypKFKUoK7PuD4X+CvCv7HPwdvr4S+fHpXm3H2m5RZpGlkUII12jjJ2gAe+c818j+Bv2oNfm+KEk2o3PnWeqXJ8+GZsKiscZBzkBc9K+7U/Y4i/4KFfsj2niLwhr81pK0zy2envxDdyxuykSnPDED5R0+Y/Wvl/4k/sE+JPCf2+G68P3unapZr+7tXgJMuD8wD9DjFfKUctfs39ZV5S/A+eyb6viYyeIklN6WfQ8/+Osa+LfEepX+j3FtLpVgrBZC3DqhAJx1ALdK8H8Y6C0mlw6rFD5UNwzIwXpn19q9G0n4IeML7Up0exvtPtpMxyPOCkW3I49+laHxS8HW3gf4dXVhK2/yYwUPZmPce1fU5bgvYUlDse86tKCjToW7aHz7J8jHIHFMMoYEEYFOZgzZz1qMnGB6V3noiZPrRRx70UAIrDHWpFf5s1X3DFOD496ALMcmCParEcwwOpGc9aoBx9KlSfCiixEkfpH/AMESv+CicfwT1a78Aa95UthqFz9v04zHaiSgDdH6ANjI96/QT4mfFu28daZdX9ne+X5qtJsyHGc8gZr+ezw3qcmmahHcxSNHLCQ6MpIKkdxX1B4C/wCCiWqaFoSWerx3FziML50D7WYjuQeDXdQoYeb5p6SPzjiLIMXPEe3wTsnuvM9+/al8cWk9hdzXN60pjYlUyFGc+gxXw5+0B8YZ/HFzHY71MNuNvy8cDpV743ftIS/EK6k+ypPFHIct5hHNeRXEzzSFnOWY5J9aWMlDmtT2Ppciy2dGivbbjM+1NLAUM+DTHc4riPpmFFFFAWZGoycU/P8AOiigHuLml3miigRYtpmjfg8EVYec4PTg49aKKpGaSuVpJMt0xxULMScUUVPUtDaR/umiigY3caKKKDQ//9k=";


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
      this.addImagesToProductList();
    });

  }


  //get list of images for current list of products asynchronously
  // listImagesForProducts() {
  //   for (let product of this.products) {
  //     this.imageService.getImagesOfProduct(product.id).subscribe(
  //       data => {
  //         this.products.find(p => p.id === product.id)!.setImages(data);
  //       }
  //     );
  //   }
  // }
  //
  images: any[] = [];
  listImagesForProduct(id: number = 82) {
    this.imageService.getImagesOfProduct(id).subscribe(
      data => {
        this.images = data;
        console.log("images=iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        console.log(this.images);
      }
    );
  }


  addImagesToProductList() {
    for (let product of this.products) {
      this.listImagesForProduct(product.id);
      product.setImages(this.images);
    }
  }



  protected listProducts() {
    this.searchMode= this.route.snapshot.paramMap.has('keyword');
    console.log("searchMode="+this.searchMode);
    if (this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    //this.listImagesForProducts();
    //this.handleListProducts();
  }
  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId){
      //get the "id" param string. convert string to a number using the "+" symbol
      //used ! to tell typescript that we know for sure that the id parameter is available
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      //not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }
    //check if we have a different category than previous
    //note: Angular will reuse a component if it is currently being viewed
    //if we have a different category id than previous, then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=1;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    //now get the products for the given category id
    this.productService.getProductListPaginate(
      this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(
        this.processResult()
      );
  }

  updatePageSize(pageSize: string) {
    this.thePageSize= +pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }


  private handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);


    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      this.processResult()
    );
  }


  private processResult() {
    return (data: any) => {
      this.products=data.content;
      //page number starts from 1 in the backend, but in the frontend it starts from 0
      this.thePageNumber=data.pageable.pageNumber+1;
      this.thePageSize=data.pageable.pageSize;
      this.theTotalElements=data.numberOfElements;
    }
  }







}
