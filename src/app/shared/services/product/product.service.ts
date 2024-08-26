import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { product, productRes } from '../../interfaces/all-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<productRes>{
    return this._HttpClient.get<productRes>(`${Enviroment.baseUrl}/api/v1/products`)
  }

  getProductById(productId:string):Observable<{data:product}>{
    return this._HttpClient.get<{data:product}>(`${Enviroment.baseUrl}/api/v1/products/${productId}`)
  }
}
