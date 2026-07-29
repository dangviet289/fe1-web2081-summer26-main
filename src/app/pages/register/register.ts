import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  loading: boolean = false;
  error = "";
  registerForm: FormGroup
  constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  public router: Router
) {
  this.registerForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator 
  });
}

passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors || {}).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  }

submitForm() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.error = '';

  const { confirmPassword, ...formData } = this.registerForm.value;

  this.http
    .post('http://localhost:3000/register', formData)
    .subscribe({
      next: () => {
        this.loading = false;
        alert('Đăng ký thành công');
        this.router.navigateByUrl('/login');
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
 
        if (err.status === 400 || err.status === 409) {

          if (typeof err.error === 'string') {
            this.error = err.error;
          } else if (err.error?.message) {
            this.error = err.error.message;
          } else {
            this.error = 'Email đã tồn tại';
          }
        } else {
          this.error = 'Đăng ký thất bại';
        }
      },
    });
}
}
