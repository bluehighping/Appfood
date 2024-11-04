import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  
  groupedProducts: { [key: string]: Product[] } = {};
  cartItems: Product[] = [];

  constructor(private http: HttpClient) {
    this.loadCartItemsFromLocalStorage();
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.http.get<any[]>('https://lk4f4fm2-3000.asse.devtunnels.ms/api/menu').subscribe(data => {
      this.products = data.map(item => new Product(
        item.id,
        item.name,
        item.price,
        item.image,
        item.category,
        item.quantity
      ));
      this.filteredProducts = this.products;
      this.groupedProducts = this.groupProducts(this.products);
    });
  }

  groupProducts(products: Product[]) {
    return products.reduce((acc: { [key: string]: Product[] }, product: Product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getOrderedCategories() {
    const categoryOrder = ['Appetizers', 'Main Courses', 'Beverages', 'Desserts'];
    return Object.keys(this.groupedProducts).sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));
  }

  getProductsByCategory(category: string) {
    return this.filteredProducts.filter(product => product.category === category);
  }

  scrollToCategory(category: string) {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(product: Product) {
    if (product.reduceStock(1)) {
      this.cartItems.push(product);
      this.saveCartItemsToLocalStorage();
      this.updateCartCount();
    } else {
      alert('Sorry, this item is out of stock!');
    }
  }

  saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateCartCount() {
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) {
      cartIcon.innerText = this.cartItems.length.toString();
    }
  }
}
