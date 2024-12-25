import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-module-form',
  templateUrl: './modules-form.component.html',
  styleUrls: ['./modules-form.component.css']
})
export class ModulesFormComponent {
  moduleForm: FormGroup;
  courseId: string;
  selectedFiles: { [key: string]: File } = {}; // To store selected files for each field

  constructor(
    public dialogRef: MatDialogRef<ModulesFormComponent>,
    private fb: FormBuilder,
    private moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data for edit functionality
  ) {
    this.courseId = data.courseId; // Access the passed courseId
    console.log('Received courseId:', this.courseId);

    // Initialize form with validators
    this.moduleForm = this.fb.group({
      module_name: [data?.module_name || '', Validators.required],
      module_description: [data?.module_description || '', Validators.required],
      intro: [null, Validators.required], // File fields should be initialized as null
      content: [null, Validators.required],
      activity: [null, Validators.required],
      course: [this.courseId || '', Validators.required]
    });
  }

  // Handle file selection for a specific field
  onFileSelect(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[fieldName] = file;
      this.moduleForm.patchValue({
        [fieldName]: file // Update the form control value with the selected file
      });
    }
  }
  

  // Save function to handle create and update operations
  onSave(): void {
    if (this.moduleForm.valid) {
      const formData = new FormData();
      console.log('Form values:', this.moduleForm.value);
      // Append form values to FormData
      Object.keys(this.moduleForm.value).forEach((key) => {
        if (key !== 'intro' && key !== 'content' && key !== 'activity') {
          formData.append(key, this.moduleForm.value[key]);
        }
      });

      // Append files to FormData
      Object.keys(this.selectedFiles).forEach((key) => {
        formData.append(key, this.selectedFiles[key]);
      });

      if (this.data?.id) {
        // Edit mode
        this.moduleService.updateModule(this.data.id, formData).subscribe(
          (response) => {
            console.log('Module updated successfully:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating module:', error);
            alert('Error updating module.');
          }
        );
      } else {
        // Create mode
        this.moduleService.createModule(formData).subscribe(
          (response) => {
            console.log('Module created successfully:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error creating module:', error);
            alert('Error creating module.');
          }
        );
      }
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields.');
    }
  }

  // Cancel the operation and close the dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}
