import { AuthService } from './../services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router'; 
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService:AuthService = inject(AuthService)
  let _Router:Router = inject(Router)
  if (_AuthService.userToken.getValue() != null) {
    return true;
  }
  _Router.navigate(['/login'])
  return false;
};
