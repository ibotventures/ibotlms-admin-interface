import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../../services/assessment.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentFormComponent } from '../assessment-form/assessment-form.component';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent implements OnInit {

  moduleId!: string; // Accept the assessment ID as an input property
  assessments: any[] = []; // Array to store assessment data
  errorMessage: string = '';

  constructor(private assessmentService: AssessmentService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.moduleId = params['moduleId']; // Get assessmentId from query params
      if (this.moduleId) {
        this.getAssessments();
      } else {
        console.error('Assessment ID not provided in query parameters!');
      }
    });
  }

  // Fetch assessments by module ID
  getAssessments(): void {
    const moduleId = this.moduleId
    this.assessmentService.getAssessmentsByModule(moduleId).subscribe(
      (response) => {
        if (response?.status?.code === 200) {
          this.assessments = response.data; // Extract assessment data
        } else {
          this.errorMessage = 'Failed to fetch assessments.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching assessments.';
        console.error(error);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AssessmentFormComponent, {
      width: '400px',
      data: this.moduleId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assessmentService.createAssessment(result).subscribe({
          next: (response) => {
            this.getAssessments();
          },
          error: (error) => {
            console.error('Error creating assessment', error);
          },
        });
      }
    });
  }

  editAssessment(assessment: any): void {
    console.log('Edit assessment:', assessment.id);
    this.assessmentService.getAssessmentById(assessment.id).subscribe({
      next: (response) => {
        const assessmentData = response.data; // Assuming the response contains the assessment data
        this.dialog.open(AssessmentFormComponent, {
          data: assessmentData, // Pass the assessment data to the dialog
        });
        this.getAssessments(); // Refresh the assessment list after editing
      },
      error: (error) => {
        console.error('Error fetching assessment data:', error);
      }
    });
  }

  deleteAssessment(assessment: any): void {
    this.assessmentService.deleteAssessment(assessment.id).subscribe({
      next: (response) => {
        console.log('Assessment deleted successfully:', response);
        this.getAssessments(); // Refresh the assessment list
      },
      error: (error) => {
        console.error('Error deleting assessment:', error);
      }
    });
  }  
}
