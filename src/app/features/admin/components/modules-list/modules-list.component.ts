import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ModulesFormComponent } from '../modules-form/modules-form.component';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.css']
})
export class ModulesListComponent implements OnInit, AfterViewInit {
  courseId!: string; // Accept the course ID as an input property

  displayedColumns: string[] = ['module_name', 'module_description', 'intro', 'content', 'activity', 'actions'];
  modules = new MatTableDataSource<any>([]); // Initialize with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private modulesService: ModuleService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the courseId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId']; // Get courseId from query params
      console.log('Course ID:', this.courseId); // Check the value of courseId
      if (this.courseId) {
        this.getModules();
      } else {
        console.error('Course ID not provided in query parameters!');
      }
    });
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.modules.paginator = this.paginator;
      this.modules.sort = this.sort;
    }
  }

  getModules(): void {
    this.modulesService.getModulesByCourse(this.courseId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.modules.data = response.data;
        }
      },
      error => {
        console.error('Error fetching modules:', error);
      }
    );
  }

editModule(module: any): void {  
  // Get the module data using the service
  this.modulesService.getModuleById(module.id).subscribe(
    (response) => {
      console.log('Module data:', response);
      const moduleData = response.data;

      // Open the dialog and pass the module data to the form
      this.dialog.open(ModulesFormComponent, {
        data: {
          ...moduleData,
          courseId: moduleData.course  // Pass courseId as well
        }
      });
    },
    (error) => {
      console.error('Error fetching module:', error);
      alert('Error fetching module data.');
    }
  );
}


  deleteModule(module: any): void {
    alert('Are you sure you want to delete this module?');
    this.modulesService.deleteModule(module.id).subscribe(
      (response) => {
        console.log('Module deleted successfully:', response);
        this.getModules(); // Refresh the module list
      },
      (error) => {
        console.error('Error deleting module:', error);
        alert('Error deleting module.');
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModulesFormComponent, {
      width: '400px',
      data: { courseId: this.courseId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getModules(); // Refresh the module list
    });
  }

  openPdf(moduleId: string, filePath: string): void {
    // Remove the first '/media/' from the filePath
    const correctedFilePath = filePath.replace('/media/', '');
  
    this.modulesService.getFile(moduleId, correctedFilePath).subscribe(
      (file: Blob) => {
        // Create a URL from the Blob (PDF file)
        const fileURL = URL.createObjectURL(file);
  
        // Open the dialog with the generated file URL
        this.dialog.open(PdfViewerDialogComponent, {
          data: { fileURL },  // Pass the fileURL to the dialog
          width: '80%',
          height: '80%',
        });
      },
      (error) => {
        console.error('Error fetching file:', error);
        alert('Failed to load the PDF.');
      }
    );
  }
 
  editAssessment(module: any): void {
    const moduleId = module.id; // Assuming 'id' is the identifier for the module
    this.router.navigate(['/admin/home/assessment-list'], { queryParams: { moduleId: moduleId } });
  }
}
