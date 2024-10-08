import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { log } from 'console';
import { Category } from '../../../shared/interfaces/all-categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  CategoryData!:Category[]
  constructor(private _CategoryService:CategoryService){}
ngOnInit(): void {
  this.getAllCategories()
}
getAllCategories(){
  this._CategoryService.getAllCategories().subscribe({
    next:res=>{
      this.CategoryData = res.data
      console.log(res);

    }
  })
}
  
}
