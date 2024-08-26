import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { categoryRes } from '../../interfaces/all-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<categoryRes>{
    return this._HttpClient.get<categoryRes>(`${Enviroment.baseUrl}/api/v1/categories`)
  }
}
