import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.css'
})
export class ImageManagerComponent implements OnInit{
  actionApiUrl = environment.springBootApiUrlhttp + "/action";

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse!: string;
  message!: string;
  imageName!: string;
  constructor(private imageService: ImageService) {
    this.subscribeToImageService();
  }



  ngOnInit(): void {
  }

  //subscribe to the imageService
  subscribeToImageService() {

    this.imageService.selectedFile$.subscribe(
      data => {
        this.selectedFile = data;
        console.log('selectedFile=' + this.selectedFile);
      }
    );

    this.imageService.retrievedImage$.subscribe(
      data => {
        this.retrievedImage = data;
        console.log('retrievedImage=' + this.retrievedImage);
      }
    );

    this.imageService.base64Data$.subscribe(
      data => {
        this.base64Data = data;
      }
    );

    this.imageService.retrieveResonse$.subscribe(
      data => {
        this.retrieveResponse = data;
        console.log('retrieveResponse=' + this.retrieveResponse);
      }
    );

    this.imageService.message$.subscribe(
      data => {
        this.message = data;
        console.log('message=' + this.message);
      }
    );


  }

  onFileChanged($event: Event) {
    this.imageService.onFileChanged($event);
    this.subscribeToImageService();
  }

onUpload() {
    this.imageService.onUpload();
  this.subscribeToImageService();
  }

  getImage(fileName: string) {
    this.imageService.getImage(fileName);
    this.subscribeToImageService();
  }



}
