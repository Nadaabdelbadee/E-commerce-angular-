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
  isLoading:boolean = false
  wishlist!:list[]
constructor(private _WishlistService:WishlistService ,private _CartService:CartService , private toastr: ToastrService){}
ngOnInit(): void {
  this.getLoggedUserWishlist()
}
getLoggedUserWishlist(){
  this.isLoading = true
  this._WishlistService.getLoggedUserWishlist().subscribe({
    next:res=>{
      this.wishlist = res.data
      console.log(this.wishlist);
      this.isLoading= false
    },
    error:err=>{
      console.log(err);
      this.isLoading = false
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
    },
    error: err => {
      console.log(err);
    }
  })
}

removeProFromWishlist(productID:string){
  this._WishlistService.removeProFromWishlist(productID).subscribe({
    next:res=>{
      console.log(res);
      this.getLoggedUserWishlist()
    },
    error:err=>{
      console.log(err);
    }
  })
}
}
