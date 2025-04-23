import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // TODO: Implement authentication service
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open(error.error.message, 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    if (field === 'name' && this.registerForm.get('name')?.hasError('required')) {
      return 'This field is required';
    }
    if (field === 'email' && this.registerForm.get('email')?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (field === 'password' && this.registerForm.get('password')?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    if (field === 'confirmPassword' && this.registerForm.get('confirmPassword')?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    if (field === 'confirmPassword' && this.registerForm.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}