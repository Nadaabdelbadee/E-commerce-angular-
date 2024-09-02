import { Data } from './../../../shared/interfaces/cart';
import { userOrders, ShippingAddress } from './../../../shared/interfaces/orders';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  list!:any

  constructor(private _OrderService:OrderService){}
  ngOnInit(): void {
  this.getUserOrders()
  }

  getUserOrders(){
    this._OrderService.getUserOrders().subscribe({
      next:res=>{
        this.list = res
        console.log(res);
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
