import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Image } from 'src/app/image/image.model';
import { ImageService } from 'src/app/image/image.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  originalImage: Image;
  image: Image;
  subscription: Subscription;
  id: string;
  currentUser = '1000'

  constructor(private imageService: ImageService,                
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe (
      image => {
        let id = image.id;
        this.originalImage = this.imageService.getImage(id);
        if (!this.originalImage) {
          return;
        } 
        this.image = JSON.parse(JSON.stringify(this.originalImage));
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newImage = new Image(value.id, value.url, value.caption, this.currentUser, value.likes, value.comments);
    console.log('this.originalImage:',this.originalImage)
    console.log('newImage:',newImage)
    this.imageService.updateImage(this.originalImage, newImage);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
