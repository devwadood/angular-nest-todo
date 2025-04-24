import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          // Handle successful login means access_token field has token save that for later use
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['todos/all']);
        },
        error: (error) => {
          console.error(error);
          // Handle login error
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
  getErrorMessage(field: string): string {
    if (this.loginForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    if (field === 'email' && this.loginForm.get('email')?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (field === 'password' && this.loginForm.get('password')?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
