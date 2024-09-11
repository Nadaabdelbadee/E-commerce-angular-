import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartProduct!:Data
  numberOfCartItems!:number
  constructor(private _CartService:CartService){}
  ngOnInit(): void {
    if (typeof localStorage !='undefined') {
      localStorage.setItem('currentBage' , '/cart')
    }

    this.getLoggedUserCart()
  }

  getLoggedUserCart(){
    this._CartService.getLoggedUserCart().subscribe({
      next:res=>{
        this.cartProduct = res.data
        this.numberOfCartItems = res.numOfCartItems
        console.log(res);

      }
    })
  }

  updateProductQuantity(productID:string , count:number){
    this._CartService.updateCartProductQuantity(productID , count.toString()).subscribe({
      next:res=>{
        console.log(res);
        this.cartProduct = res.data
      }
    })
  }


  deleteSpecificItem(ProductID:string){
    this._CartService.removeSpecificItem(ProductID).subscribe({
      next:res=>{
        console.log(res);
        this.cartProduct = res.data
      }
    })
  }

  
}
