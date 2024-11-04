import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private location: Location) {}

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

  generateOrderSummary(): void {
    const orderSummary = {
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

    console.log(JSON.stringify(orderSummary, null, 2));
  }

  confirmAction() {
    const orderSummary = this.generateOrderSummary();
    console.log(orderSummary);
    alert('Thank you for your order! Check console for details.'); 
    this.closeModal(); 
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
