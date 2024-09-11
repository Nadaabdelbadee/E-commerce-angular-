import { product } from './../../../shared/interfaces/all-products';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { list } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlist!:list[]
constructor(private _WishlistService:WishlistService ,private _CartService:CartService , private toastr: ToastrService){}
ngOnInit(): void {
  this.getLoggedUserWishlist()
}
getLoggedUserWishlist(){
  this._WishlistService.getLoggedUserWishlist().subscribe({
    next:res=>{
      this.wishlist = res.data
      console.log(this.wishlist);
    }
  })
}

addProductToCart(productId:string) {
  this._CartService.addProductToCart(productId).subscribe({
    next: res => {
      console.log(res);
      this.toastr.success(res.message, '', {
        progressBar: true
      });
    }
  })
}

removeProFromWishlist(productID:string){
  this._WishlistService.removeProFromWishlist(productID).subscribe({
    next:res=>{
      console.log(res);
      this.getLoggedUserWishlist()
    }
  })
}
}
