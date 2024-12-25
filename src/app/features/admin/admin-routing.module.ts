import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StatisticsDashboardComponent } from './components/statistics-dashboard/statistics-dashboard.component';
import { CourseCategoriesComponent } from './components/course-categories/course-categories.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { ModulesListComponent } from './components/modules-list/modules-list.component';
import { OfflinePurchaseFormComponent } from './components/offline-purchase-form/offline-purchase-form.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { CertificationViewComponent } from './components/certification-view/certification-view.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'home', component: AdminDashboardComponent,
    children: [
      { path: 'statistics', component: StatisticsDashboardComponent },
      { path: 'course-categories', component: CourseCategoriesComponent },
      { path: 'courses-list', component: CourseListComponent },
      { path: 'students-list', component: StudentsListComponent },
      { path: 'profile', component: AccountProfileComponent},
      { path: 'invoice-list', component: InvoiceListComponent },
      { path: 'invoice-details/:id', component: InvoiceDetailsComponent },
      { path: 'invoice-form', component: OfflinePurchaseFormComponent },
      { path: 'modules-list', component: ModulesListComponent },
      { path: 'assessment-list', component: AssessmentListComponent },
      { path: 'certification', component: CertificationViewComponent },
      { path: 'products', component: ProductsComponent },
    ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
