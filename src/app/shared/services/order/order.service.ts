import { Address } from './../../interfaces/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2SecureServer } from 'http2';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { orders } from '../../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  userTokenHeader = { token: localStorage.getItem('userToken') || '' }

  constructor(private _HttpClient: HttpClient) { }
  chechOut(cartID: string, data: Address):Observable<orders> {
    return this._HttpClient.post<orders>(`${Enviroment.baseUrl}/api/v1/orders/checkout-session/${cartID}?url=${Enviroment.websiteUrl}`, {
      shippingAddress: data
    },
      {
        headers: this.userTokenHeader
      })
  }
}
