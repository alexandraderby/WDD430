import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageService } from 'src/app/image/image.service';
import { Image } from 'src/app/image/image.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {


  @Input() image: Image;
  id: string;

  constructor(private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.route.params
      .subscribe(
        (params: Params) => { 
          this.id = params['id'];
          this.image = this.imageService.getImage(this.id);
        }
      );
    }

    onDelete() {
      this.imageService.deleteImage(this.image);
      this.router.navigate(['/profile']);
   }

}
