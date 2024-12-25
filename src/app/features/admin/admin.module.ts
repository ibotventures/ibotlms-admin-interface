import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminserviceService } from './services/adminservice.service';
import { UsersService } from './services/users.service';
import { CoursesService } from './services/courses.service';
import { ModuleService } from './services/module.service';
import { AssessmentService } from './services/assessment.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { CertificationService } from './services/certification.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { MatMenuModule } from '@angular/material/menu';
import { StatisticsDashboardComponent } from './components/statistics-dashboard/statistics-dashboard.component';
import { CourseCategoriesComponent } from './components/course-categories/course-categories.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { ProfileEditDialogComponent } from './components/profile-edit-dialog/profile-edit-dialog.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { ModulesListComponent } from './components/modules-list/modules-list.component';
import { ModulesFormComponent } from './components/modules-form/modules-form.component';
import { OfflinePurchaseFormComponent } from './components/offline-purchase-form/offline-purchase-form.component';
import { PdfViewerDialogComponent } from './components/pdf-viewer-dialog/pdf-viewer-dialog.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './components/assessment-form/assessment-form.component';
import { CertificationViewComponent } from './components/certification-view/certification-view.component';
import { CertificationFormComponent } from './components/certification-form/certification-form.component';
import { CertificationQuestionFormComponent } from './components/certification-question-form/certification-question-form.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryformComponent } from './components/categoryform/categoryform.component';
import { ProductformComponent } from './components/productform/productform.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';  // For mat-table
import { MatCheckboxModule } from '@angular/material/checkbox';  // For mat-checkbox
import { MatSortModule } from '@angular/material/sort';  // For mat-sort (if needed)
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    StatisticsDashboardComponent,
    CourseCategoriesComponent,
    CourseListComponent,
    StudentsListComponent,
    AccountProfileComponent,
    ProfileEditDialogComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    CourseFormComponent,
    ModulesListComponent,
    ModulesFormComponent,
    OfflinePurchaseFormComponent,
    PdfViewerDialogComponent,
    AssessmentListComponent,
    AssessmentFormComponent,
    CertificationViewComponent,
    CertificationFormComponent,
    CertificationQuestionFormComponent,
    ProductsComponent,
    CategoryformComponent,
    ProductformComponent,
  ],
  imports: [
    // BrowserAnimationsModule,
    // MatExpansionModule,
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
  ],
  providers: [AdminserviceService,UsersService,CoursesService, ModuleService, AssessmentService, CategoriesService, ProductsService, CertificationService ]
})
export class AdminModule { }
