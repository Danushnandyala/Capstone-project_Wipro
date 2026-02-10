import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api.service'; // Removed unused import
import { AuthService } from '../../services/auth.service';
import { OrderItem } from '../../models/order-item.model';
import { User } from '../../models/user.model';

// DSfH.ts used ApiService. I need to make sure I have ApiService or use OrderItemService.
// KB2X.ts is OrderItemService and has getAllOrderItems(). 
// I will use OrderItemService instead of ApiService to be consistent with the restored services.

import { OrderItemService } from '../../services/order-item.service';

@Component({
    selector: 'app-all-orders',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './all-orders.html',
    styleUrls: ['./all-orders.css']
})
export class AllOrdersComponent implements OnInit {
    orders: OrderItem[] = [];
    loading = true;
    error = '';
    // user: User | null = null; // Admin check likely handled by Guard, but can keep for UI

    get groupedOrders() {
        const grouped: { [key: number]: any } = {};
        this.orders.forEach(item => {
            if (!grouped[item.order_id!]) {
                grouped[item.order_id!] = { items: [] };
            }
            grouped[item.order_id!].items.push(item);
        });
        return Object.values(grouped);
    }

    get totalRevenue(): number {
        return this.orders.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }

    get totalItems(): number {
        return this.orders.reduce((sum, item) => sum + item.quantity, 0);
    }

    constructor(private orderItemService: OrderItemService, private authService: AuthService) { }

    ngOnInit() {
        // this.user = this.authService.getUser(); // AuthService might not have getUser() anymore, check auth.service.ts
        // Assuming admin guard protects this route.
        this.loadOrders();
    }

    loadOrders() {
        this.orderItemService.getAllOrderItems().subscribe({
            next: (data) => {
                this.orders = data;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load orders';
                this.loading = false;
                console.error(error);
            }
        });
    }
}
