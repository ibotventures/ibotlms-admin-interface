import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'user', 'email', 'phone', 'age', 'actions'];
  students = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  searchText: string = ''; // Property to bind to the search input

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loadUserDetails();

    // Custom filter logic to filter by username
    this.students.filterPredicate = (data: any, filter: string): boolean => {
      return data.username.toLowerCase().includes(filter.trim().toLowerCase());
    };
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.students.paginator = this.paginator;
      this.students.sort = this.sort;
    }
  }

  loadUserDetails() {
    this.userService.getAllUserDetails().subscribe(
      (response) => {
        this.students.data = response.data; // Assuming response.data contains the user records
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  applyFilter() {
    this.students.filter = this.searchText.trim().toLowerCase();
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.students.data.forEach(student => this.selection.select(student));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.students.data.length;
    return numSelected === numRows;
  }

  isSelected(student: any): boolean {
    return this.selection.isSelected(student);
  }

  editStudent(student: any) {
    alert(`Edit Student: ${student.username}`);
  }

  deleteStudent(student: any) {
    if (confirm(`Are you sure you want to delete ${student.username}?`)) {
      this.userService.deleteUser(student.id).subscribe(
        (response) => {
          alert('Student deleted successfully');
          this.loadUserDetails(); // Refresh the list after deletion
        },
        (error) => {
          alert('Error deleting student');
        }
      );
    }
  }
}
