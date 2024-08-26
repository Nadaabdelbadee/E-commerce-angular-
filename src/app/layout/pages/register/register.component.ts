import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isloading:boolean = false;
  errMsg!:string;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
    rePassword: new FormControl(null,[Validators.required]),
    phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:this.chechRePasswordMatch })

  constructor(private _AuthService:AuthService , private _Router:Router){}

  chechRePasswordMatch(g:AbstractControl){
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }else{
      g.get('rePassword')?.setErrors({mismatch:true});
      return {mismatch:true};
    }
  }

  submitForm(){

    if (this.registerForm.valid) {
      this.isloading= true
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isloading = false
          console.log(res);
          this._Router.navigate(['/login'])
        },
        error:(err)=>{
          this.isloading= false
          console.log(err);
          this.errMsg = err.error.message;

        }
      })
    }
  }

}
