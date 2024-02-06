import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  actionApiUrl = environment.springBootApiUrlhttp + "/action";

  selectedFile$: BehaviorSubject<File> = new BehaviorSubject<File>(new File([], ''));
  retrievedImage$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  base64Data$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  retrieveResonse$: BehaviorSubject<any> = new BehaviorSubject<string>("");
  message$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  //Gets called when the user selects an image
  onFileChanged(event: any) {
    //Select File
    this.selectedFile$.next(event.target.files[0]);
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile$.value);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile$.value, this.selectedFile$.value?.name || '');

    this.httpClient.post(this.actionApiUrl + '/upload', uploadImageData, { observe: 'response' })
      .subscribe(
        (response) => {
          if (response.status === 200) {
            this.message$.next('Image uploaded successfully');
          } else {
            this.message$.next('Image not uploaded successfully');
          }
        }
      );
  }

  //Gets called when the user clicks on retrieve image button to get the image from backend
  getImage(fileName: string) {
    console.log(fileName);
    this.httpClient.get(this.actionApiUrl + '/get/' + fileName)
      .subscribe(
        res => {
          this.retrieveResonse$.next(res);
          this.base64Data$.next(this.retrieveResonse$.value.picByte);
          this.retrievedImage$.next('data:image/jpeg;base64,' + this.base64Data$.value);
        }
      );
  }

}
