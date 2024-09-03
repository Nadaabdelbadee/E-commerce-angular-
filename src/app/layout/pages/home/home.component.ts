
import { product } from './../../../shared/interfaces/all-products';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { HomeSliderComponent } from "../../additions/home-slider/home-slider.component";
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, HomeSliderComponent, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  wishList!: string[]
  productId!: string
  userWord: string = ' ';
  isLoading: boolean = false
  productList!: product[]
  constructor(private _ProductService: ProductService, private _CartService: CartService, private toastr: ToastrService, private _WishlistService: WishlistService , private el:ElementRef) { }
  
  @ViewChild('heartIcon') heartIcon!:ElementRef
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentBage', '/home')
    };

    this.getAllProducts();
    // // for (let i = 0; i < this.wishList.length; i++) {
    //   if (this.wishList.includes(this.productId)) {
    //     this.heartIcon.nativeElement.add('text-red-500')
    //   }else{
    //     this.heartIcon.nativeElement.remove('text-red-500')
    //   }
    // // }
  }
  getAllProducts() {
    this.isLoading = true
    this._ProductService.getAllProducts().subscribe({
      next: res => {
        this.productList = res.data
        console.log(this.productList)
        this.isLoading = false
      },
      error: err => {
        console.log(err);
        this.isLoading = false
      }
    })
  }

  addProductToCart(productId: string) {
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
  
addProductToWishlist(productID: string) {
  this._WishlistService.addProductToWishlist(productID).subscribe({
    next: res => {
      this.productId = productID;
      this.wishList = res.data
      console.log(this.wishList);
      this.toastr.success(res.message, '', {
        progressBar: true
      });
    },
    error: err => {
      console.log(err);

    }
  })
}
}
