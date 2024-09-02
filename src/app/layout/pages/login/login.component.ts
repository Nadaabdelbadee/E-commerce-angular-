import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isloading: boolean = false
  errMsg!: string

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])
  })
  constructor(private _AuthService: AuthService, private _Router: Router) { }


  submitLogin() {
    if (this.loginForm.valid) {
      this.isloading = true;
      this._AuthService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isloading = false;
          console.log(res);
          // this._AuthService.userDataToken()
          if (res.token !== null) {
            localStorage.setItem('userToken', res.token)
          } 
          this._AuthService.decodeUserToken();
          this._Router.navigate(['/home'])
        },
        error: (err) => {
          this.isloading = false
          console.log(err);
          this.errMsg = err.error.message;
        }
      })
    }
  }
}
