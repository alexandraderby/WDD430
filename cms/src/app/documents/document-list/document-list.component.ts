import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() documentWasSelected = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "R. Kent Jackson", "cool document", "document1.url", null),
    new Document(2, "Rex Barzeer", "very cool document", "document2.url", null),
    new Document(3, "Tom Hardy", "very very cool document", "document3.url", null),
    new Document(4, "Rachel McAdams", "very very very cool document", "document4.url", null),
    new Document(5, "Wesley Snipes", "very very very very cool document", "document5.url", null)

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }

}
