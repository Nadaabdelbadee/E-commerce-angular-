import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetCodeComponent } from "../reset-code/reset-code.component";
import { NewPasswordComponent } from "../new-password/new-password.component";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, ResetCodeComponent, NewPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgetPasswordFlag:boolean = true
  resetCodeFlag = false
  isLoading:boolean = false;
  errMsg!:string
  emailForm:FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
  })
  constructor(private _AuthService:AuthService){}
  submitEmailForm(){
    this.isLoading = true;
    if (this.emailForm.valid) {
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next:res=>{
          console.log(res);
          this.isLoading = false;
          this.forgetPasswordFlag = false
          this.resetCodeFlag = true

        },
        error:err=>{
          console.log(err);
          this.isLoading = false
          this.errMsg = err.error.message;
        }
      })
    }
    
  }
}
