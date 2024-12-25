import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {
  productData = {
    product_name: '',
    description: '',
    category: '',
    price: '',
    make: '',
  };

  categories: any[] = [];
  productPhoto: File | null = null;
  loading = false;
  isEditing = false; // Track if we are editing or creating a product
  productId: string = ''; // Store the product ID for editing

  constructor(
    private dialogRef: MatDialogRef<ProductformComponent>,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the passed product data
  ) {}

  ngOnInit(): void {
    // Fetch categories when component initializes
    this.categoriesService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });

    // If we are editing, populate the form fields with the data
    if (this.data) {
      this.isEditing = true;
      this.productId = this.data.id;
      this.productData = {
        product_name: this.data.product_name,
        description: this.data.description,
        category: this.data.category,
        price: this.data.price,
        make: this.data.make,
      };
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.productPhoto = input.files[0];
    }
  }

  onSubmit() {
    if (!this.productPhoto && !this.isEditing) {
      alert('Please select a product photo.');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', this.productData.product_name);
    formData.append('description', this.productData.description);
    formData.append('category', this.productData.category);
    formData.append('price', this.productData.price.toString());
    formData.append('make', this.productData.make);

    // If a photo is selected, add it to the formData
    if (this.productPhoto) {
      formData.append('product_image', this.productPhoto);
    }

    this.loading = true;

    if (this.isEditing) {
      // Call updateProduct if editing
      this.productsService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.loading = false;
        },
      });
    } else {
      // Call createProduct if adding new
      this.productsService.createProduct(formData).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating product', error);
          this.loading = false;
        },
      });
    }
  }

  closeDialog() {
    this.dialogRef.close(false); // Close dialog without submission
  }
}
