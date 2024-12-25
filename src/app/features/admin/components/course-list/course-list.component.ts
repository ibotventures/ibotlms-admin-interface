import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { CoursesService } from '../../services/courses.service';
import { CourseFormComponent } from '../course-form/course-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, AfterViewInit {

  constructor(private courseService: CoursesService, private dialog: MatDialog, private router: Router) { }

  displayedColumns: string[] = ['select', 'courseName', 'category', 'lessons', 'enrollment', 'status',  'actions', 'toggleStatus'];

  courses = new MatTableDataSource<any>([]);  // Initialize as an empty array
  selection = new SelectionModel<any>(true, []); // Multi-select

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Non-null assertion
  @ViewChild(MatSort) sort!: MatSort;  // Non-null assertion

  ngOnInit(): void {
    this.getCourses(); // Call the method to load data
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.courses.paginator = this.paginator;
      this.courses.sort = this.sort;
    }
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.courses.data = response.data; // Set the fetched courses to data source
        }
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  // Handle pagination changes
  pageChanged(event: any) {
    if (this.paginator) {
      // this.courses.paginator.pageIndex = event.pageIndex;
      // this.courses.paginator.pageSize = event.pageSize;
    }
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.courses.data.forEach(course => this.selection.select(course));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.courses.data.length;
    return numSelected === numRows;
  }

  isSelected(course: any): boolean {
    return this.selection.isSelected(course);
  }

  editCourse(course: any): void {
    const courseId = course.id; // Use the course ID to fetch details
    this.courseService.getCourseById(courseId).subscribe(
      (response: any) => {
        if (response && response.data) {
          const courseData = response.data;
  
          // Open the dialog with the fetched course data
          const dialogRef = this.dialog.open(CourseFormComponent, {
            width: '600px',
            data: courseData // Pass course data to the form component
          });
  
          // Handle the dialog close event
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              console.log('Updated Course Data:', result);
              this.getCourses(); // Refresh the course list after updating
            }
          });
        } else {
          console.error('Failed to fetch course data:', response);
        }
      },
      error => {
        console.error('Error fetching course by ID:', error);
      }
    );
  }
  

  editModules(course: any): void {
    const courseId = course.id; // Assuming 'id' is the identifier for the course
    alert(`Edit Modules for Course: ${course.id}`);
    this.router.navigate(['/admin/home/modules-list'], { queryParams: { courseId: courseId } });
  }

  editCertification(course: any): void {
    const courseId = course.id; // Assuming 'id' is the identifier for the course
    alert(`Edit Certifications for Course: ${course.id}`);
    this.router.navigate(['/admin/home/certification'], { queryParams: { courseId: courseId } });
  }

  deleteCourse(course: any) {
    const courseId = course.id; // Assuming 'id' is the identifier for the course
    alert(`Delete Course: ${course.course_name}`);
    
    // Call the deleteCourse function from the service
    this.courseService.deleteCourse(courseId).subscribe(
      (response) => {
        // Handle success response
        // alert(`Course ${course.course_name} deleted successfully.`);
        this.getCourses(); // Refresh the course list after deleting  
        // Optionally, remove the deleted course from the data source
        this.courses.data = this.courses.data.filter(c => c.id !== courseId);
      },
      (error) => {
        // Handle error response
        alert(`Failed to delete course: ${course.courseName}`);
        console.error('Error:', error);
        this.getCourses(); // Refresh the course list after deleting
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form data:', result);
        // Call getCourses to refresh the data after a course is added/edited
        this.getCourses();
      } else {
        console.log('Dialog was closed without saving.');
        this.getCourses(); // Refresh the course list after closing the dialog
      }
    });
  }
  
  toggleCourseStatus(course: any, newStatus: boolean): void {
    // Optimistic update: Change status locally first
    const previousStatus = course.status;
    course.status = newStatus;

    // Call backend to update status
    this.courseService.updateCourseVisibility(course.id, newStatus).subscribe({
      next: (response) => {
        if (response.status?.code === 200) {
          console.log('Course status updated successfully:', response.data);
        } else {
          console.error('Unexpected response:', response);
          course.status = previousStatus; // Revert in case of unexpected response
        }
      },
      error: (err) => {
        console.error('Failed to update course status:', err);
        // Revert status if the API call fails
        course.status = previousStatus;
      }
    });
  }  
}
