import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrl: './image-manager.component.css'
})
export class ImageManagerComponent implements OnInit{
  message: any;
  retrievedImage: any;

  constructor(private imageService: ImageService) {
    this.message = imageService.message;
    this.retrievedImage = imageService.retrievedImage;
  }



  ngOnInit(): void {
  }

  onFileChanged($event: Event) {
    this.imageService.onFileChanged($event);
  }

onUpload() {
    this.imageService.onUpload();
  }

  getImage() {
    this.imageService.getImage()
  }



}
