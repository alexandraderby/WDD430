import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/image/image.model';
import { ImageService } from 'src/app/image/image.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit {

  @Input() image: Image;

  constructor(private imageService: ImageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
