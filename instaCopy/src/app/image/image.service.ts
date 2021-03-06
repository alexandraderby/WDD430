import { Injectable, EventEmitter } from "@angular/core";
import { Image } from "./image.model";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ImageService {

  imageSelectedEvent = new EventEmitter<Image>();
  imageListChangedEvent = new Subject<Image[]>();

  images: Image[] = [];
  maxImageId: number;

  constructor(private http: HttpClient) {
    this.maxImageId = this.getMaxId();
  }

  getImages() {
    return this.http.get<Image[]>('http://localhost:3030/images')
      .subscribe(
        (images: Image[]) => {
          this.images = images;
          this.images  = JSON.parse(JSON.stringify(this.images)).images
          this.maxImageId = this.getMaxId();
          this.images.sort((a,b) => {
            if (+a.id > +b.id) {
              return -1;
            }
            if (+a.id < +b.id) {
              return 1;
            }
            return 0;
          });
        let imageListCopy = this.images.slice();
        this.imageListChangedEvent.next(imageListCopy);
      },
      (error: any) => {
        console.log(error);
      } 
    )
  }

  liveUpdateImages() {
    this.imageListChangedEvent.next(this.images.slice());
  }

  getImage(id: string) {
    for (let image of this.images) {
        if(image.id == id) {
          return image;
        } 
    }
  }

  getMaxId(): number {
    let maxId = 0;
    for (let image of this.images) {
      let currentId = +image.id;
      if (currentId > maxId) {
        maxId = currentId;
      } 
    }
    return maxId;
   }


addImage(image: Image) {
  if (!image) {
    return;
  }

  // make sure id of the new Image is empty
  image.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, image: Image }>('http://localhost:3030/images',
    image,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new image to images
        this.images.unshift(responseData.image);
        this.liveUpdateImages();
      }
    );
}


  updateImage(originalImage: Image, newImage: Image) {
    if (!originalImage || !newImage) {
      return;
    }

    const pos = this.images.findIndex(d => d.id === originalImage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Image to the id of the old Image
    newImage.id = originalImage.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3030/images/' + originalImage.id,
      newImage, { headers: headers })
      .subscribe(
        () => {
          this.images[pos] = newImage;
          this.liveUpdateImages();
        }
      );
  }


  deleteImage(image: Image) {

    if (!image) {
      return;
    }

    const pos = this.images.findIndex(d => d.id === image.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3030/images/' + image.id)
      .subscribe(
        (response: Response) => {
          this.images.splice(pos, 1);
          this.liveUpdateImages();
        }
      );
      
  }

  
}


