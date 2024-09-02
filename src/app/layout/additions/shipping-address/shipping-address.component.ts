import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  ShippingAddressForm:FormGroup = new FormGroup({
    details:new FormControl(null , Validators.required),
    phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl(null , Validators.required)
  })

  constructor(private _OrderService:OrderService , private _ActivatedRoute:ActivatedRoute , private _AuthService:AuthService){}
  submitshippingAddressForm(){
    if (this.ShippingAddressForm.valid) {
      this._ActivatedRoute.paramMap.subscribe({
        next:p=>{
          this._OrderService.chechOut(p.get('cartID')! , this.ShippingAddressForm.value).subscribe({
            next:res=>{
              console.log(res);
              window.open(res.session.url , '_self')
              
            },
            error:err=>{
              console.log(err);
              
            }
          })
        }
      })
     
    }
  }

  submitCashOrderForm(){
    if (this.ShippingAddressForm.valid) {
      this._ActivatedRoute.paramMap.subscribe({
        next:p=>{
          this._OrderService.cashOrder(p.get('cartID')! , this.ShippingAddressForm.value).subscribe({
            next:res=>{
              console.log(res);
            },
            error:err=>{
              console.log(err);
            }
          })
        }
      })
      
     
    }
  }

}
