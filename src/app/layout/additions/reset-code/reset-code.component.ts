import { Component, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewPasswordComponent } from "../new-password/new-password.component";

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule, NewPasswordComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {
  resetCodeFlag = true
  newPasswordFlag = false
  isLoading: boolean = false
  constructor(private _AuthService: AuthService) { }
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)])
  })
  submitCodeForm() {
    this.isLoading = true
    if (this.codeForm.valid) {
      this._AuthService.verifyResetCode(this.codeForm.value).subscribe({
        next: res => {
          console.log(res);
          this.isLoading = false;
          this.resetCodeFlag = false
          this.newPasswordFlag = true
        },
        error: err => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }

}
