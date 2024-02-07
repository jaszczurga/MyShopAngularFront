import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {ImageDto} from "../dto/image-dto";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  actionApiUrl = environment.springBootApiUrlhttp + "/action";

  selectedFile$: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);



  //////// 1. Get the image from the backend////////
  retrievedImage$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  base64Data$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  retrieveResonse$: BehaviorSubject<any> = new BehaviorSubject<string>("");
  message$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  //Gets called when the user selects an image
  onFileChanged(event: any) {
    //Select File
   // this.selectedFile$.next(event.target.files[0]);
    const currentFileList = this.selectedFile$.value;
    const updatedFileList = [...currentFileList, ...event.target.files];
    this.selectedFile$.next(updatedFileList);
    console.log(this.selectedFile$.value);
    //console.log(this.getListOfImagesDtoFromSelectedFiles());
    return "File changed";
  }


  // getListOfImagesDtoFromSelectedFiles(): ImageDto[] {
  //   const imageDtoList: ImageDto[] = [];
  //   for (let i = 0; i < this.selectedFile$.value.length; i++) {
  //     const imageDto: ImageDto = new ImageDto();
  //     const file = this.selectedFile$.value[i];
  //
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result as string;
  //       const base64StringWithoutData = this.extractBase64FromDataURI(base64String);
  //
  //       imageDto.picByte = base64StringWithoutData?.toString();
  //       imageDto.name = file.name;
  //       imageDto.type = file.type;
  //
  //       imageDtoList.push(imageDto);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   return imageDtoList;
  // }

  getListOfImagesDtoFromSelectedFiles(list:File[]): ImageDto[] {
    const imageDtoList: ImageDto[] = [];
    for (let i = 0; i < list.length; i++) {
      const imageDto: ImageDto = new ImageDto();
      const file = list[i];

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64StringWithoutData = this.extractBase64FromDataURI(base64String);

        imageDto.picByte = base64StringWithoutData?.toString();
        imageDto.name = file.name;
        imageDto.type = file.type;

        imageDtoList.push(imageDto);
      };
      reader.readAsDataURL(file);
    }

    return imageDtoList;
  }

  extractBase64FromDataURI(dataURI: string): string | null {
    const matches = dataURI.match(/^data:image\/\w+;base64,(.+)$/);
    if (matches && matches.length === 2) {
      return matches[1];
    }
    return null;
  }


  // //Gets called when the user clicks on submit to upload the image
  // onUpload(productId: number) {
  //   console.log(this.selectedFile$.value);
  //
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile$.value, this.selectedFile$.value?.name || '');
  //
  //   this.httpClient.post(this.actionApiUrl + `/upload/${productId}`, uploadImageData, { observe: 'response' })
  //     .subscribe(
  //       (response) => {
  //         if (response.status === 200) {
  //           this.message$.next('Image uploaded successfully');
  //         } else {
  //           this.message$.next('Image not uploaded successfully');
  //         }
  //       }
  //     );
  // }

  //Gets called when the user clicks on retrieve image button to get the image from backend
  // getImage(fileName: string) {
  //   console.log(fileName);
  //   this.httpClient.get(this.actionApiUrl + '/get/' + fileName)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse$.next(res);
  //         this.base64Data$.next(this.retrieveResonse$.value.picByte);
  //         this.retrievedImage$.next('data:image/jpeg;base64,' + this.base64Data$.value);
  //       }
  //     );
  // }

}
