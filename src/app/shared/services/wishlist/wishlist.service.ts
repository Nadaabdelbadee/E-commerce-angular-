import { wishlistRes } from './../../interfaces/wishlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { wishlist } from '../../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  userTokenHeader = {token:localStorage.getItem('userToken') || ''}

  constructor(private _HttpClient:HttpClient) { }
  addProductToWishlist(productId:string):Observable<wishlist>{
    return this._HttpClient.post<wishlist>(`${Enviroment.baseUrl}/api/v1/wishlist`,
      {productId:productId})
  }


  getLoggedUserWishlist():Observable<wishlistRes>{
    return this._HttpClient.get<wishlistRes>(`${Enviroment.baseUrl}/api/v1/wishlist`
    )
  }

  removeProFromWishlist(productID:string):Observable<wishlist>{
    return this._HttpClient.delete<wishlist>(`${Enviroment.baseUrl}/api/v1/wishlist/${productID}`)
  }
}
