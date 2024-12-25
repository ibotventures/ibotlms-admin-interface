import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true, // Adjusted to not use standalone, per your preference
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService],
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup; // Fixed: Added '!' to indicate this will be initialized in ngOnInit
  logo: string = '../../assets/logo.png';
  card: string = '../../assets/signup.png';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('SignupComponent initialized');
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10,15}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern("^[0-9]{5,6}$")]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const payload = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      phone: this.signupForm.value.phone,
      addresses: [{
        street: this.signupForm.value.street,
        city: this.signupForm.value.city,
        state: this.signupForm.value.state,
        zip: this.signupForm.value.pin,
        country: this.signupForm.value.country
      }],
      role : 'user'
    };

    this.authService.signup(payload).subscribe({
      next: (response: any) => {
        this.router.navigate(['/auth/login']);
      },
      error: (error: any) => {
        console.error('Signup failed', error);
      }
    });
  }
}
