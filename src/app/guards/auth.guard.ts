import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './.././services/auth';

// Guard chặn chưa login (dùng cho trang bảo mật như Trang chủ)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Cho phép vào
  }

  // Chưa login -> đá về trang login
  router.navigateByUrl('/login');
  return false;
};

// Guard chặn đã login rồi (dùng cho trang login)
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return true; // Chưa login thì cho vào trang login
  }

  // Đã login rồi -> đá về trang chủ, không cho vào trang login nữa
  router.navigateByUrl('/');
  return false;
};