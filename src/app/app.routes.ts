import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent }, 
  { path: 'cart', component: CartComponent }  
];
