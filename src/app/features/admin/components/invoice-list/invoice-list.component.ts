import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { AdminserviceService } from '../../services/adminservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'vendor_name', 
    'customer_name', 
    'product_name', 
    'product_price', 
    'product_quantity', 
    'payment_term', 
    'order_id', 
    'transaction_number', 
    'status', 
    'actions'
  ];

  invoices = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private adminservice: AdminserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPurchases();
  }

  ngAfterViewInit(): void {
    this.invoices.paginator = this.paginator;
    this.invoices.sort = this.sort;
  }

  getAllPurchases(): void {
    this.adminservice.getAllPurchases().subscribe(
      (response: any) => {
        if (response.status && response.status.code === 200) {
          // Extract the 'data' array from the response
          this.invoices.data = response.data || [];
          console.log('All purchases:', this.invoices.data);
        } else {
          console.error('Failed to fetch purchases:', response.status?.message || 'Unknown error');
        }
      },
      (error) => {
        console.error('Error fetching purchases:', error);
      }
    );
  }
  

  viewDetails(invoice: any): void {
    this.router.navigate(['/admin/home/invoice-details', invoice.id]); // Navigate to invoice details with ID
  }
}
