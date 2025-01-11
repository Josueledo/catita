import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]); // Estado inicial do carrinho
  cart$ = this.cart.asObservable(); // Observable para componentes se inscreverem


  addToCart(product: any) {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart); // Atualiza o carrinho
    localStorage.setItem('carrinho', JSON.stringify(updatedCart)); // Persiste no localStorage
  }

  getCart() {
    return this.cart.value;
  }

  clearCart() {
    this.cart.next([]);
    localStorage.removeItem('carrinho');
  }
  removeFromCart(productId: string) {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(item => item.productId !== productId);
    this.cart.next(updatedCart); // Atualiza o carrinho
    localStorage.setItem('carrinho', JSON.stringify(updatedCart)); // Atualiza o localStorage
  }
}
