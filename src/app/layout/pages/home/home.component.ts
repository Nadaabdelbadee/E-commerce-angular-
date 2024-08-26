import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/all-products';
import { CategorySliderComponent } from "../../additions/category-slider/category-slider.component";
import { HomeSliderComponent } from "../../additions/home-slider/home-slider.component";
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, HomeSliderComponent , RouterLink, SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userWord:string = ' ' ;
  isLoading:boolean = false
  productList!:product[]
  constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    if (typeof localStorage !='undefined') {
      localStorage.setItem('currentBage' , '/home')
    };

    this.getAllProducts();
  }
  getAllProducts(){
    this.isLoading= true
    this._ProductService.getAllProducts().subscribe({
      next:res=>{
        this.productList = res.data
        console.log(this.productList)
        this.isLoading = false
      },
      error:err=>{
        console.log(err);
       this.isLoading = false 
      }
    })
  }
}
