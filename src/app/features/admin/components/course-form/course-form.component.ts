import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  courseForm: FormGroup;
  products: any[] = [];
  isSubmitting = false;

  // Component constructor with injected services
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseFormComponent>,
    private courseService: CoursesService,
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any // Receive data for editing from parent component
  ) {
    // Initialize form with values or empty if creating a new course
    this.courseForm = this.fb.group({
      course_name: [data?.course_name || '', Validators.required],
      course_description: [data?.course_description || '', Validators.required],
      course_duration: [data?.course_duration || '', [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]+$')]], // Allows integers and decimals
      course_price: [data?.course_price || '', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Allows up to 2 decimal places
      status: [data?.status || false, Validators.required],
      product: [data?.product || '', Validators.required],
      course_cover_image: [data?.course_cover_image || null, Validators.required],
      video: [data?.video || '', [Validators.required, Validators.pattern('https?://.+')]], // Validates proper URL format
    });    
  }

  ngOnInit(): void {
    this.getProducts();
  
    if (this.data && this.data.course) {
      this.courseForm.patchValue(this.data.course); // Pre-fill form with data
    }
  }
  

  getProducts(): void {
    this.productsService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.data; // Store full product objects
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  

  // Method to transform data before submitting
  private transformFormData(formData: any): any {
    const transformedData: any = {
      ...formData,
      course_price: formData.course_price.toString(),
      status: !!formData.status,
    };
  
    // Handle file upload
    if (formData.course_cover_image) {
      const formDataObject = new FormData();
      Object.keys(transformedData).forEach((key) => {
        formDataObject.append(key, transformedData[key]);
      });
      formDataObject.append('course_cover_image', formData.course_cover_image);
      return formDataObject;
    }
  
    return transformedData;
  }
  

  // Handle form submission
  onSubmit() {
    console.log('Form data:', this.courseForm.value);
    if (this.courseForm.valid) {
      this.isSubmitting = true; // Start submission
      const transformedData = this.transformFormData(this.courseForm.value);
      // If we are editing a course, call updateCourse, otherwise createCourse
      if (this.courseForm.value.id) {
        this.courseService.updateCourse(this.courseForm.value.id, transformedData).subscribe(
          (response) => {
            console.log('Course updated successfully:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating course:', error);
            this.isSubmitting = false; // Reset submission status
          }
        );
      } else {
        this.courseService.createCourse(transformedData).subscribe(
          (response) => {
            console.log('Course created successfully:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error creating course:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseForm.patchValue({ course_cover_image: file });
    }
  }


  // Handle cancel action
  onCancel() {
    this.dialogRef.close();
  }
}
