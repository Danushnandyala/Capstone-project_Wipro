import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.html',
    styleUrls: ['./cart.css']
})
export class CartComponent {
    cartService = inject(CartService);
    orderService = inject(OrderService);
    authService = inject(AuthService);
    router = inject(Router);

    cartItems: CartItem[] = [];
    total = 0;
    loading = false;
    successMessage = '';
    errorMessage = '';

    constructor() {
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
            this.total = this.cartService.getTotal();
        });
    }

    increase(item: CartItem) {
        if (item.product_id) {
            const success = this.cartService.updateQuantity(item.product_id, item.quantity + 1, item.stock_quantity || 0);
            if (success) {
                this.errorMessage = '';
            } else {
                this.errorMessage = `There are only ${item.stock_quantity} stocks available`;
                setTimeout(() => this.errorMessage = '', 3000);
            }
        }
    }

    decrease(item: CartItem) {
        if (item.product_id) {
            this.cartService.updateQuantity(item.product_id, item.quantity - 1, item.stock_quantity || 999);
            this.errorMessage = '';
        }
    }

    remove(item: CartItem) {
        if (item.product_id) {
            this.cartService.removeFromCart(item.product_id);
        }
    }

    showConfirmation = false;
    showPayment = false;

    checkout() {
        if (this.cartItems.length === 0) return;
        const user = this.authService.getUser();
        if (!user) {
            this.errorMessage = 'You must be logged in to checkout.';
            return;
        }
        this.showConfirmation = true;
    }

    confirmOrder() {
        this.showConfirmation = false;
        this.showPayment = true;
    }

    cancelOrder() {
        this.showConfirmation = false;
        this.showPayment = false;
    }

    completePayment() {
        this.loading = true;
        const user = this.authService.getUser();

        const orderRequest = {
            userId: user!.user_id!,
            items: this.cartItems.map(item => ({
                productId: item.product_id!,
                quantity: item.quantity
            }))
        };

        this.orderService.placeOrder(orderRequest).subscribe({
            next: (response) => {
                this.successMessage = 'Order placed successfully!';
                this.cartService.clearCart();
                this.loading = false;
                this.showPayment = false;
                setTimeout(() => {
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/user/orders']);
                    });
                }, 1500);
            },
            error: (err) => {
                console.error('Order placement failed', err);
                this.errorMessage = err.error || 'Failed to place order. Please try again.';
                this.loading = false;
                this.showPayment = false;
            }
        });
    }
}
