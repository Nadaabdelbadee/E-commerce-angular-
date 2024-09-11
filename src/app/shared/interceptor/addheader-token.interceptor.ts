import { HttpInterceptorFn } from '@angular/common/http';

export const addheaderTokenInterceptor: HttpInterceptorFn = (req, next) => {


  let userToken = {
    token:localStorage.getItem('userToken')!
  }

  if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
    req = req.clone({
      setHeaders: userToken
    })
  }
  
  return next(req);
};
