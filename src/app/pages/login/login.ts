import { AuthService } from './../../services/auth';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  error = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Sử dụng AuthService thay vì HttpClient trực tiếp
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = "";

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigateByUrl("/");
      },
      error: () => {
        this.loading = false;
        this.error = "Sai email hoặc mật khẩu";
      },
    });
  }
}