import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminserviceService } from '../../services/adminservice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  purchaseId: string | null = null; // The purchaseId from route
  purchaseData: any; // To store the fetched purchase data

  constructor(
    private route: ActivatedRoute,
    private invoiceService: AdminserviceService // Inject the invoice service to fetch data
  ) {}

  ngOnInit(): void {
    // Get purchaseId from the route parameters
    this.purchaseId = this.route.snapshot.paramMap.get('id');
    console.log('Purchase ID:', this.purchaseId);
    if (this.purchaseId) {
      // Fetch the purchase data based on purchaseId
      this.fetchInvoiceData(this.purchaseId);
    }
  }

  // Function to fetch invoice details using the service
  fetchInvoiceData(purchaseId: string): void {
    this.invoiceService.getPurchaseById(purchaseId).subscribe(
      (response) => {
        this.purchaseData = response.data; // Assign fetched data to purchaseData
      },
      (error) => {
        console.error('Error fetching invoice data:', error);
      }
    );
  }

  downloadInvoice() {
    const invoiceElement = document.querySelector('.invoice-container') as HTMLElement;

    if (invoiceElement) {
      html2canvas(invoiceElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Fit width to A4
        const pageHeight = 297; // A4 page height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 10; // Starting Y position

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        pdf.save('invoice.pdf');
      });
    }
  }
}
