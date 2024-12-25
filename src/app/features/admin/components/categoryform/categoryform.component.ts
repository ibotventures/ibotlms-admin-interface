
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categoryform',
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.css'
})
export class CategoryformComponent {
  categoryData = {
    start_age: null,
    end_age: null,
    level: '',
    category_name: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CategoryformComponent>,
    private categoryService: CategoriesService
  ) {}

  onSubmit() {
    this.categoryService.createCategory(this.categoryData).subscribe({
      next: (response) => {
        console.log('Category created successfully', response);
        this.dialogRef.close(true); // Pass success response back
      },
      error: (err) => {
        console.error('Error creating category', err);
      },
    });
  }

  closeDialog() {
    this.dialogRef.close(false); // Pass cancel action back
  }
}
