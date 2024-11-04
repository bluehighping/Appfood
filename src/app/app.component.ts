import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ทำให้เป็น standalone component
  imports: [CommonModule, RouterModule], // นำเข้า CommonModule และ RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  cartCount!: number; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTotalQuantityFromLocalStorage();
  }

  loadTotalQuantityFromLocalStorage() {
    const totalQuantity = localStorage.getItem('totalQuantity');
    this.cartCount = totalQuantity ? JSON.parse(totalQuantity) : 0;
  }

  updateCartCount(total: number) {
    this.cartCount = total;
    localStorage.setItem('totalQuantity', JSON.stringify(total));
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  isCartPage(): boolean {
    return this.router.url === '/cart';
  }
}
