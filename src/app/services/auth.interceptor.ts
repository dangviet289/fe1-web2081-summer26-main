import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  // Nếu có token, clone request cũ và thêm header Authorization vào
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // Nếu không có token, giữ nguyên request và gửi đi bình thường
  return next(req);
};