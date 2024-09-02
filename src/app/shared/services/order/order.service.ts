import { Address } from './../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { cashOrderRes, orders, userOrders } from '../../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  userDataID!:any
  userTokenHeader = { token: localStorage.getItem('userToken') || '' }

  constructor(private _HttpClient: HttpClient) { }
  chechOut(cartID:string, data: Address):Observable<orders> {
    return this._HttpClient.post<orders>(`${Enviroment.baseUrl}/api/v1/orders/checkout-session/${cartID}?url=${Enviroment.websiteUrl}`, {
      shippingAddress: data
    },
      {
        headers: this.userTokenHeader
      })
  }
  cashOrder(cartID:string , data :Address):Observable<cashOrderRes>{
    return this._HttpClient.post<cashOrderRes>(`${Enviroment.baseUrl}/api/v1/orders/${cartID}`,
      {
        shippingAddress: data
      },
      {
        headers: this.userTokenHeader
      }
    )
  }

  getUserOrders():Observable<userOrders>{
    this.userDataID= localStorage.getItem('userDataID');
    return this._HttpClient.get<userOrders>(`${Enviroment.baseUrl}/api/v1/orders/user/${this.userDataID}`)
  }
}
