import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent {
  questionForm: FormGroup;
  isEditMode: boolean; // Flag to check if we're editing an existing assessment
  assessmentId: string | null = null; // To store the assessment ID for edit mode
  moduleId: string; // To store the module ID

  constructor(
    private dialogRef: MatDialogRef<AssessmentFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public assessmentData: any, // Get the assessment data passed from dialog
    @Inject(MAT_DIALOG_DATA) public injectedModuleId: string, // Get the moduleId passed from dialog
    private assessmentService: AssessmentService // Inject the service to handle the save and update
  ) {
    // Assign moduleId from injected data
    this.moduleId = injectedModuleId;

    // Check if we are in edit mode or create mode
    this.isEditMode = !!assessmentData?.id;
    this.assessmentId = this.isEditMode ? assessmentData.id : null;

    // Initialize the form with either existing data (edit) or empty data (create)
    this.questionForm = this.fb.group({
      question: [this.assessmentData?.question || '', Validators.required],
      option1: [this.assessmentData?.option1 || '', Validators.required],
      option2: [this.assessmentData?.option2 || '', Validators.required],
      option3: [this.assessmentData?.option3 || '', Validators.required],
      option4: [this.assessmentData?.option4 || '', Validators.required],
      answer: [this.assessmentData?.answer || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;
      if (this.isEditMode) {
        // If in edit mode, call updateAssessment with the existing ID
        this.assessmentService.updateAssessment(this.assessmentId!, formData).subscribe({
          next: (response) => {
            console.log('Assessment updated successfully:', response);
            this.dialogRef.close(response); // Close the dialog and pass the updated data
          },
          error: (error) => {
            console.error('Error updating assessment:', error);
          }
        });
      } else {
        // If in create mode, include the moduleId in the formData
        const createData = {
          module: this.moduleId,
          ...this.questionForm.value,
        };
        // Call saveAssessment to create a new assessment
        console.log('Creating assessment:', createData);
        this.assessmentService.createAssessment(createData).subscribe({
          next: (response) => {
            console.log('Assessment created successfully:', response);
            this.dialogRef.close(response); // Close the dialog and pass the created data
          },
          error: (error) => {
            console.error('Error creating assessment:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without sending data
  }
}
