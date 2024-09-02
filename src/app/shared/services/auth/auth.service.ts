import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { registerData , LoginData ,responceNotSucc , responceSuccess, email, code, newPassword } from '../../interfaces/data';
import { Enviroment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userToken:BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient , private _Router:Router ,@Inject(PLATFORM_ID) id:object ) { 
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.userDataToken()
        // _Router.navigate([localStorage.getItem('currentBage')])
      }
    }
  }

  forgetPassword(data:email):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }
  
  verifyResetCode(data:code):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/verifyResetCode` , data)

  }
  
  setNewPassword(data:newPassword):Observable<any>{
    return this._HttpClient.put(`${Enviroment.baseUrl}/api/v1/auth/resetPassword` , data)
  }

  signUp(data:registerData):Observable<responceSuccess|responceNotSucc>
  {
    return this._HttpClient.post<responceSuccess|responceNotSucc>(`${Enviroment.baseUrl}/api/v1/auth/signup` , data)
  }

  signIn(data:LoginData):Observable<responceSuccess|responceNotSucc>
  {
    return this._HttpClient.post<responceSuccess|responceNotSucc>(`${Enviroment.baseUrl}/api/v1/auth/signin` , data)
  }

  userDataToken()
  {
    this.userToken.next(JSON.stringify(localStorage.getItem('userToken')))
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userToken.next(null);
    this._Router.navigate(['/login']);

  }
}
