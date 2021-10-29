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
    this.documents = this.documentService.getDocuments();

    this.documentListChangedSubscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );

  }

  ngOnDestroy() {
    this.documentListChangedSubscription.unsubscribe();

  }



}
