import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    public cart$ = this.cartItems.asObservable();

    constructor() {
        this.restoreCart();
    }

    addToCart(product: Product): boolean {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item.product_id === product.product_id);
        const stock = product.stock_quantity || 0;

        if (existingItem) {
            if (existingItem.quantity < stock) {
                existingItem.quantity += 1;
                this.cartItems.next([...currentItems]);
                this.saveCart();
                return true;
            }
            return false;
        } else {
            if (stock > 0) {
                this.cartItems.next([...currentItems, { ...product, quantity: 1 }]);
                this.saveCart();
                return true;
            }
            return false;
        }
    }

    removeFromCart(productId: number) {
        const currentItems = this.cartItems.value.filter(item => item.product_id !== productId);
        this.cartItems.next(currentItems);
        this.saveCart();
    }

    updateQuantity(productId: number, quantity: number, stock: number): boolean {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(item => item.product_id === productId);
        if (item) {
            if (quantity > stock) return false;

            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartItems.next([...currentItems]);
                this.saveCart();
            }
            return true;
        }
        return false;
    }

    clearCart() {
        this.cartItems.next([]);
        localStorage.removeItem('cart');
    }

    getItems(): CartItem[] {
        return this.cartItems.value;
    }

    private saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
    }

    private restoreCart() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.cartItems.next(JSON.parse(stored));
        }
    }

    getTotal(): number {
        return this.cartItems.value.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    }
}
