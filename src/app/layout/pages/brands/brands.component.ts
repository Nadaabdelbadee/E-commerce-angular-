import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { allBrands} from '../../../shared/interfaces/allbrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  isLoading:boolean = false

  allBrands!:allBrands[]
  constructor(private _BrandService:BrandService){}
  ngOnInit(): void {
    if (typeof localStorage !='undefined') {
      localStorage.setItem('currentBage' , '/brands')
    }
    this.getAllBrands()
  }

  getAllBrands(){
    this.isLoading = true
    this._BrandService.getAllBrands().subscribe({
      next:res=>{
        this.allBrands = res.data
        console.log(res);
        this.isLoading = false
      },
      error:err=>{
        console.log(err);
        this.isLoading = false
      }
    })
  }
}
