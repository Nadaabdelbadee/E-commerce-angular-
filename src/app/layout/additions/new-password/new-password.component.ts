import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { fstat } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  isLoading:boolean = false
  newPasswordForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required , Validators.email]),
    newPassword:new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])
  })
  constructor(private _AuthService:AuthService ,private _Router:Router){}

  submitNewPassword(){
    this.isLoading = true
    if (this.newPasswordForm.valid) {
      this._AuthService.setNewPassword(this.newPasswordForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.isLoading = false
          localStorage.setItem('userToken', res.token)
          this._AuthService.decodeUserToken();
          this._Router.navigate(['/home'])

        },error:err=>{
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }
}
