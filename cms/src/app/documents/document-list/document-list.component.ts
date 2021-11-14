import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = []
  private documentListChangedSubscription: Subscription;


  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //console.log('Making the get request in ngOnInit')
    this.documentService.getDocuments();
    //console.log('ngOnInit is listening for the data list announcement from the get request')
    this.documentListChangedSubscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
        //console.log('ngOnInit just heard from the get request that the data list has been updated/changed')
        this.documents = documents;
      }
    );
  }

  ngOnDestroy() {
    this.documentListChangedSubscription.unsubscribe();

  }



}
