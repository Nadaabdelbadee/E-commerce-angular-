import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { product } from '../../../shared/interfaces/all-products';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  wishList!: string[]
  productDetails!:product
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private _ProductService: ProductService , private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService ,private toastr: ToastrService , private _WishlistService:WishlistService) { }
  ngOnInit(): void {
    this.getProductByID()
  }
  getProductByID() {

    let id:string = ''
    this._ActivatedRoute.params.subscribe({
      next:p=>{
        id = p['id']
        console.log(p['id']);
      }
    })
    this._ProductService.getProductById(id).subscribe({
      next: res => {
        this.productDetails = res.data
        console.log(this.productDetails);
      }
    })
  }
  addProductToCart(productId:string){
    this._CartService.addProductToCart(productId).subscribe({
      next:res=>{
        console.log(res);
        this.toastr.success(res.message , '' , {
          progressBar:true
        });
      }
    })
  }
  addProductToWishlist(productID: string) {
    this._WishlistService.addProductToWishlist(productID).subscribe({
      next: res => {
        this.wishList = res.data
        console.log(this.wishList);
        this.toastr.success(res.message, '', {
          progressBar: true
        });
      }
    })
  }
}
