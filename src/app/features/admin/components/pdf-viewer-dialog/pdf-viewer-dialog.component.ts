import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer-dialog',
  template: `
    <div style="width: 100%; height: 100%">
      <!-- Display PDF using an iframe -->
      <iframe [src]="safeUrl" width="100%" height="100%" style="border:none;"></iframe>
    </div>
  `,
})
export class PdfViewerDialogComponent {
  safeUrl: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { fileURL: string },
    private sanitizer: DomSanitizer
  ) {
    // Sanitize the URL before using it in the iframe
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.fileURL);
  }
}
