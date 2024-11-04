export class Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number; 
  stockQuantity: number; 

  constructor(id: string, name: string, price: number, image: string, category: string, stockQuantity: number, quantity: number = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.quantity = quantity;
    this.stockQuantity = stockQuantity; 
  }

  reduceStock(quantity: number): boolean {
    if (this.stockQuantity >= quantity) {
      this.stockQuantity -= quantity;
      return true;
    }
    return false;
  }
}