import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { BrandService } from '../../../shared/services/brand/brand.service';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
 isLogin:boolean = false;

 constructor(public _AuthService:AuthService , private _FlowbiteService:FlowbiteService , private _BrandService:BrandService){}

 ngOnInit(): void {
  this._FlowbiteService.loadFlowbite(flowbite => {
    // Your custom code here
    console.log('Flowbite loaded', flowbite);
  });
  
  this._AuthService.userToken.subscribe( ()=>{
    if (this._AuthService.userToken.getValue() != null) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  })
 };
}
