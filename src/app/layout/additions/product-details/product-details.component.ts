import { product } from './../../../shared/interfaces/all-products';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productDetails!:product
  isLoading:boolean= false
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
  constructor(private _ProductService: ProductService , private _ActivatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.getProductByID()
  }
  getProductByID() {
    this.isLoading = true
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
        this.isLoading = false
      },
      error: err => {
        console.log(err);
        this.isLoading = false

      }
    })
  }
}
