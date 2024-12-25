import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-certification-question-form',
  templateUrl: './certification-question-form.component.html',
  styleUrls: ['./certification-question-form.component.css']
})
export class CertificationQuestionFormComponent implements OnInit {
  certificationQuestionForm!: FormGroup;  // Form group for the form
  isEditMode: boolean = false;  // Flag to track if we're in edit mode

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CertificationQuestionFormComponent>,
    private certificationService: CertificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.questionId;  // Check if we're editing an existing question

    // Initialize the form with the passed data
    this.certificationQuestionForm = this.fb.group({
      certification: [this.data?.certification || Validators.required],
      question: [this.data?.question, Validators.required],
      option1: [this.data?.option1, Validators.required],
      option2: [this.data?.option2, Validators.required],
      option3: [this.data?.option3, Validators.required],
      option4: [this.data?.option4, Validators.required],
      answer: [this.data?.answer, Validators.required],
    });

    // If editing, ensure the form is populated with the provided data
    if (this.isEditMode) {
      this.certificationQuestionForm.setValue({
        certification: this.data.certification,
        question: this.data.question,
        option1: this.data.option1,
        option2: this.data.option2,
        option3: this.data.option3,
        option4: this.data.option4,
        answer: this.data.answer,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.certificationQuestionForm.valid) {
      console.log('Form data:', this.certificationQuestionForm.value);
      if (this.isEditMode && this.data?.questionId) {
        this.certificationService.updateCertificationQuestion(this.data.questionId, this.certificationQuestionForm.value).subscribe({
          next: (response) => {
            if (response?.status?.code === 200) {
              this.dialogRef.close(response.data);
            }
          },
          error: (error) => {
            console.error('Error updating certification question', error);
            // Show error message to the user
          }
        });
      } else {
        // If adding a new question, call the create API
        this.certificationService.createCertificationQuestion(this.certificationQuestionForm.value).subscribe({
          next: (response) => {
            if (response?.status?.code === 201) {
              this.dialogRef.close(response.data);
            }
          },
          error: (error) => {
            console.error('Error creating certification question', error);
            // Show error message to the user
          }
        });
      }
    }
  }
}
