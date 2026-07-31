import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  // Hàm kiểm tra đã đăng nhập chưa
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  // Hàm đăng xuất
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }
}