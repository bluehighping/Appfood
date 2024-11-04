import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  @Output() cartUpdated = new EventEmitter<number>();
  cartItems: Product[] = [];
  showModal: boolean = false;
  selectedTable: number | null = null;
  modalVisible: boolean = true;
  showSlip: boolean = false;

  constructor(private location: Location, private http: HttpClient) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadCartItemsFromLocalStorage();
    this.updateCartCount();
  }

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.updateCartCount();
    }
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.updateCartCount();
  }

  updateCartCount() {
    const total = this.totalQuantity();
    this.cartUpdated.emit(total);
    localStorage.setItem('totalQuantity', JSON.stringify(total));
  }

  confirmCart() {
    this.showModal = true;
  }

  generateOrderSummary() {
    return {
      tableNumber: this.selectedTable,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: this.cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity
      })),
      totalPrice: this.totalPrice()
    };
  }

  confirmAction() {
    const orderSummary = this.generateOrderSummary();

    this.http.post('https://lk4f4fm2-3000.asse.devtunnels.ms/api/order', orderSummary).subscribe({
      next: response => {
        console.log('Order confirmed:', response);
        alert('Thank you for your order! Check console for details.');
        this.clearCart();
        this.closeModal();
      },
      error: error => {
        console.error('Error confirming order:', error);
        alert('There was an error processing your order. Please try again.');
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  removeItem(index: number): void {
    if (index > -1 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.updateCartCount();
    }
  }

  incrementQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.updateCart();
  }
  
  decrementQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.updateCart();
    }
  }
  
  updateCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCartCount(); 
  }

  totalQuantity(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
  
  totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  selectTable(tableNumber: number): void {
    this.selectedTable = tableNumber;
  }
}
