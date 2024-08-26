import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/all-products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[] , userWord:string): product[] {
    return productList.filter(function(item){
      return item.title.toLowerCase().includes(userWord.toLowerCase())
    } );
  }

}
