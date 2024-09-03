import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { cartRes } from '../../interfaces/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  userTokenHeader = {token:localStorage.getItem('userToken') || ''}
  constructor(private _HttpClient:HttpClient) { }
  
  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/cart` ,{productId:productId} , {
      headers: this.userTokenHeader
    })
  }

  getLoggedUserCart():Observable<cartRes>{
    return this._HttpClient.get<cartRes>(`${Enviroment.baseUrl}/api/v1/cart`,{
      headers:this.userTokenHeader
    })
  }

  updateCartProductQuantity(productID:string , count:string):Observable<cartRes>{
    return this._HttpClient.put<cartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productID}` , {count:count} ,{
      headers:this.userTokenHeader
    })
  }

  removeSpecificItem(productID:string):Observable<cartRes>{
    return this._HttpClient.delete<cartRes>(`${Enviroment.baseUrl}/api/v1/cart/${productID}`,{
      headers:this.userTokenHeader
    })
  }
}
