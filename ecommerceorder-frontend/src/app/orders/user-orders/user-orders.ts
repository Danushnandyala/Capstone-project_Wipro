import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-orders',
    standalone: true,
    imports: [CommonModule, RouterModule, DatePipe],
    templateUrl: './user-orders.html',
    styleUrls: ['./user-orders.css']
})
export class UserOrdersComponent implements OnInit {
    orders: any[] = [];
    loading = true;
    errorMessage = '';
    userId: number | null = null;

    constructor(private orderService: OrderService, private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            if (user && user.user_id) {
                this.userId = user.user_id;
                this.loadOrders();
            } else {
                // Fallback to local storage if AuthService behavior subject is empty (e.g. hard refresh)
                const stored = localStorage.getItem('currentUser');
                if (stored) {
                    const u = JSON.parse(stored);
                    if (u.user_id) {
                        this.userId = u.user_id;
                        this.loadOrders();
                        return;
                    }
                }
                this.loading = false;
                this.errorMessage = 'Please log in to view your orders.';
            }
        });
    }

    loadOrders() {
        console.log('UserOrdersComponent: loadOrders called for userId:', this.userId);
        if (!this.userId) {
            console.warn('UserOrdersComponent: No userId found, skipping API call');
            return;
        }

        this.loading = true;
        this.orderService.getUserOrders(this.userId).subscribe({
            next: (res: any[]) => {
                console.log('UserOrdersComponent: Received orders from API:', res);
                this.orders = res || [];
                // Sort by date descending (newest first)
                this.orders.sort((a, b) => {
                    return new Date(b.order_date).getTime() - new Date(a.order_date).getTime();
                });
                this.loading = false;
            },
            error: (err: any) => {
                console.error('UserOrdersComponent: API Error fetching orders:', err);
                this.errorMessage = 'Failed to load orders. Please check your connection.';
                this.loading = false;
            }
        });
    }
}
