import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  logo: string = '../../assets/logo.png';
  card: string = '../../assets/branding.png';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    console.log('LoginComponent initialized');
    // debugger;
  }
  
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        console.log('Token:', response.session.token);
        localStorage.setItem('token', response.session.token);
        localStorage.setItem('userId', response.data.user_id);
        if(response.data.role === 'admin') {
          this.router.navigate(['/admin/home/statistics']);
        } else{
          this.router.navigate(['/user/home']);
        }
      },
      error => {
        console.error('Login failed', error);
        // Handle error here (e.g., show error message)
      }
    );
  }
}
