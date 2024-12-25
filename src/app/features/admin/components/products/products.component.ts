import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryformComponent } from '../categoryform/categoryform.component';
import { ProductformComponent } from '../productform/productform.component';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: any[] = []; // Initialize as an empty array
  products: any[] = [];

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getCategory();
    this.displayProduct();
  }

  openDialog(product: any = null) {
    const dialogRef = this.dialog.open(ProductformComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.displayProduct();
        console.log('Product added successfully!');
      } else {
        this.displayProduct();
        console.log('Dialog closed without submission.');
      }
    });
  }

  getCategory() {
    this.categoriesService.getCategories().subscribe((response: any) => {
      if (response?.data) {
        console.log('API Response:', response.data);
        this.categories = response.data.map((category: any) => ({
          ageRange: `Age ${category.start_age}-${category.end_age}`,
          level: category.level,
          name: category.category_name,
        }));
      }
    });
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryformComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategory();
        console.log('Category added successfully');
      } else {
        this.getCategory();
        console.log('Dialog closed without submission');
      }
    });
  }

  displayProduct(){
    this.productsService.getAllProducts().subscribe((response: any) => {
      if (response?.data) {
        this.products = response.data;
      } else {
        console.log('No products found');
      }
    });
  }

  editProduct(product: any) {
    this.openDialog(product);
  }

  deleteProduct(product: any) {
    this.productsService.deleteProduct(product.id).subscribe((response: any) => {
      if (response?.data) {
        console.log('Product deleted successfully');
        this.displayProduct();
      } else {
        console.log('Failed to delete product');
        this.displayProduct();
      }
    });
  }
}
