import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from '../../services/certification.service';
import { MatDialog } from '@angular/material/dialog';
import { CertificationFormComponent } from '../certification-form/certification-form.component';
import { CertificationQuestionFormComponent } from '../certification-question-form/certification-question-form.component';

@Component({
  selector: 'app-certification-view',
  templateUrl: './certification-view.component.html',
  styleUrls: ['./certification-view.component.css']
})
export class CertificationViewComponent implements OnInit {
  courseId: string | null = null;
  certifications: any[] = []; // Array to hold certification data
  certification_questions: any[] = []; // Array to hold certification questions
  errorMessage: string | null = null; // To display error messages, if any

  constructor(
    private route: ActivatedRoute,
    private certificationService: CertificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get courseId from query parameters
    this.courseId = this.route.snapshot.queryParamMap.get('courseId');

    if (this.courseId) {
      // Fetch certifications for the courseId
      this.getCertificationsByCourseId(this.courseId);
    } else {
      this.errorMessage = 'Course ID is missing in the URL.';
    }
  }

  getCertificationsByCourseId(courseId: string): void {
    this.certificationService.getCertificationsByCourseId(courseId).subscribe({
      next: (response) => {
        if (response.status.code === 200) {
          this.certifications = response.data;
          if (this.certifications.length > 0) {
            // Fetch questions for the first certification
            this.getCertificationQuestions(this.certifications[0].id);
          }
        } else {
          this.errorMessage = response.status.message || 'Failed to fetch certifications.';
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching certifications.';
        console.error(error);
      }
    });
  }

  getCertificationQuestions(certificationId: string): void {
    this.certificationService.getCertificationQuestionsByCertificationId(certificationId).subscribe({
      next: (response) => {
        if (response.status.code === 200) {
          this.certification_questions = response.data;
        } else {
          this.errorMessage = 'Failed to fetch certification questions.';
        }
      },
      // error: (error) => {
      //   this.errorMessage = 'An error occurred while fetching certification questions.';
      //   console.error(error);
      // }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CertificationFormComponent, {
      width: '400px',
      data: { course: this.courseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.certifications.push(result); // Optionally, handle the newly created certification here
      }
    });
  }

  openQuestDialog(): void {
    const dialogRef = this.dialog.open(CertificationQuestionFormComponent, {
      data: { certification: this.certifications[0]?.id },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the submitted question here
        this.certification_questions.push(result);
      }
    });
  }

  editQuestion(question: any): void {
    const dialogRef = this.dialog.open(CertificationQuestionFormComponent, {
      width: '400px',
      data: { 
        certification: question.certificationId,  // Pass the certification ID
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        answer: question.answer,
        questionId: question.id,  // Pass the question ID for updating
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Optionally, handle the updated question here, e.g., refresh the list
        this.getCertificationQuestions(this.certifications[0].id);  // Refresh question list
      }
    });
  }
  

  deleteQuestion(question: any): void {
    const questionId = question.id;
    const certificationId = question.certificationId;

    this.certificationService.deleteCertificationQuestion(questionId).subscribe({
      next: (response) => {
        this.getCertificationQuestions(certificationId); 
      },
      error: (error) => {
        console.error('Error deleting question:', error);
      }
    });
  }
}
