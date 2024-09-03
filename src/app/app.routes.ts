import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAddressComponent } from './layout/additions/shipping-address/shipping-address.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' ,pathMatch:'full'},
    {path:'home' , component:HomeComponent , canActivate:[authGuard]},
    {path:'cart' , component:CartComponent ,canActivate:[authGuard]},
    {path:'products' , component:ProductsComponent ,canActivate:[authGuard]},
    {path:'categories' , component:CategoriesComponent ,canActivate:[authGuard]},
    {path:'brands' , component:BrandsComponent ,canActivate:[authGuard]},
    {path:'shippingAddress/:cartID' , component:ShippingAddressComponent ,canActivate:[authGuard]},
    {path:'allorders' , component:AllordersComponent ,canActivate:[authGuard]},
    {path:'wishlsit' , component:WishlistComponent ,canActivate:[authGuard]},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
    {path:'forgetpassword' , component:ForgetPasswordComponent},
    {path:'productdetails/:id' , component:ProductDetailsComponent ,canActivate:[authGuard]},
    {path:'**' , component:NotfoundComponent},
];
