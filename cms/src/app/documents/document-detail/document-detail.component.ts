import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  
  nativeWindow: any;
  document: Document;
  id: string;

  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private winRefService: WinRefService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => { 
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
          this.documentService.documentListChangedEvent.subscribe(() => {
            this.document = this.documentService.getDocument(this.id);
          })
      }
      );

      this.nativeWindow = this.winRefService.getNativeWindow();
  }
  
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }

}
