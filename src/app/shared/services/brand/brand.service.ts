import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { Brands } from '../../interfaces/allbrands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<Brands>{
    return this._HttpClient.get<Brands>(`${Enviroment.baseUrl}/api/v1/brands`)
  }
}
