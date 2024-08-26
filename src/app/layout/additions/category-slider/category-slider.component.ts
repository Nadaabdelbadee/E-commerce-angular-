import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/all-categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  isLoading:boolean = false
    categoryList!:Category[]
    constructor(private _CategoryService:CategoryService){}
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 7
        },
      },
      nav: true
    }

    ngOnInit(): void {
      this.getAllCategories()
    }
    getAllCategories(){
      this.isLoading = true
      this._CategoryService.getAllCategories().subscribe({
        next:res=>{
          this.categoryList = res.data
          console.log(this.categoryList);
          this.isLoading = false
        },
        error:err=>{
          console.log(err);
          this.isLoading = false
        }
      })
    }
}
