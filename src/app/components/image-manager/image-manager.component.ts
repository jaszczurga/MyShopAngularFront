import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.css'
})
export class ImageManagerComponent implements OnInit{

  ngOnInit() {
  }

  constructor(private httpClient: HttpClient) {
  }

  actionApiUrl = environment.springBootApiUrlhttp + "/action";

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName='h.jpg';

  //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post( this.actionApiUrl+'/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    console.log(this.imageName);
    this.httpClient.get( this.actionApiUrl+'/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
