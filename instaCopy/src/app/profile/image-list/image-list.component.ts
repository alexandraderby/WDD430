import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/image/image.service';
import { Image } from 'src/app/image/image.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, OnDestroy {


  images: Image[] = []
  private imageListChangedSubscription: Subscription;


  constructor(private imageService: ImageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageService.getImages();
    this.imageListChangedSubscription = this.imageService.imageListChangedEvent
    .subscribe(
      (images: Image[]) => {
        let userImages = images.filter(image => {
          if (image.user == "1000") {
            return image
          }
        })
        this.images = userImages;
      }
    );
  }

  ngOnDestroy() {
    this.imageListChangedSubscription.unsubscribe();

  }

}
