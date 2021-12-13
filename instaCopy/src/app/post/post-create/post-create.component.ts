import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from 'src/app/image/image.service';
import { Image } from 'src/app/image/image.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  currentUser: string = "1000";

  originalImage: Image;
  image: Image;
  editMode: boolean = false;
  subscription: Subscription;

  constructor( 
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.params
    .subscribe (
      (params: Params) => {
        let id = params.id;
          if (!id) {
            this.editMode == false;
            return;
          }
        this.originalImage = this.imageService.getImage(id);
        this.imageService.imageListChangedEvent.subscribe(() => {
          this.editMode = true;
          this.image = JSON.parse(JSON.stringify(this.imageService.getImage(id)));
        })
        if (!this.originalImage) {
          return;
        }
        this.editMode = true;
        this.image = JSON.parse(JSON.stringify(this.originalImage));
    }) 
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newImage = new Image(value.id, value.url, value.caption, this.currentUser, value.likes, value.comments);
    if (this.editMode == true) {
      this.imageService.updateImage(this.originalImage, newImage);
    }
    else {
      this.imageService.addImage(newImage);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
