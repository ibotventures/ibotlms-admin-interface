import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css']
})
export class CertificationFormComponent {
  certificationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CertificationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private certificationService: CertificationService
  ) {
    this.certificationForm = this.fb.group({
      course: [data.course, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.certificationForm.valid) {
      const certificationData = this.certificationForm.value;
      this.certificationService.createCertification(certificationData).subscribe({
        next: (response) => {
          if (response.status.code === 201) {
            this.dialogRef.close(response.data);  // Close dialog and pass the data back
          }
        },
        error: (error) => {
          console.error('Error creating certification', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
