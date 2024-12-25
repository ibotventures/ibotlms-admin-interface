import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminserviceService } from '../../services/adminservice.service';
import { ProductsService } from '../../services/products.service'; // Add this import

@Component({
  selector: 'app-offline-purchase-form',
  templateUrl: './offline-purchase-form.component.html',
  styleUrls: ['./offline-purchase-form.component.css'],
})
export class OfflinePurchaseFormComponent implements OnInit {
  formData: any = {
    vendor_name: '',
    vendor_contact_name: '',
    vendor_contact_number: '',
    vendor_email: '',
    vendor_address: '',
    customer_name: '',
    customer_contact_name: '',
    customer_contact_number: '',
    customer_email: '',
    customer_address: '',
    payment_term: '',
    order_id: '',
    transaction_number: '',
    product: '',
    product_price: null,
    product_quantity: null,
  };

  products: any[] = []; // To store the fetched products

  constructor(
    private purchaseService: AdminserviceService,
    private productsService: ProductsService // Inject the ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllProducts(); // Fetch products when the component initializes
  }

  // Fetch all products
  getAllProducts() {
    this.productsService.getAllProducts().subscribe(
      (response) => {
        this.products = response.data; // Store the fetched products
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.purchaseService.createPurchase(form.value).subscribe(
        (response) => {
          console.log('Purchase created successfully', response);
          alert('Purchase created successfully!');
          form.resetForm(); // Clear form after submission
        },
        (error) => {
          console.error('Error creating purchase', error);
          alert('Error creating purchase. Please try again.');
        }
      );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
