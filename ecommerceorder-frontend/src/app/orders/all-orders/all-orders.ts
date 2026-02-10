import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-all-orders',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './all-orders.html',
    styleUrls: ['./all-orders.css']
})
export class AllOrdersComponent implements OnInit {
    orders: any[] = [];
    loading = true;
    error = '';
    searchTerm: string = '';

    constructor(private orderService: OrderService, private authService: AuthService) { }

    ngOnInit() {
        this.loadOrders();
    }

    get filteredOrders() {
        if (!this.searchTerm) {
            return this.orders;
        }
        const term = this.searchTerm.toLowerCase();
        return this.orders.filter(order =>
            order.user?.username?.toLowerCase().includes(term) ||
            order.user?.user_id?.toString().includes(term) ||
            order.order_id?.toString().includes(term)
        );
    }

    get groupedOrders() {
        return this.filteredOrders;
    }

    get totalRevenue(): number {
        return this.filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    }

    get totalItems(): number {
        return this.filteredOrders.reduce((sum, order) => sum + (order.orderItems?.length || 0), 0);
    }

    loadOrders() {
        this.orderService.getAllOrders().subscribe({
            next: (data: any[]) => {
                this.orders = data;
                this.loading = false;
            },
            error: (error: any) => {
                this.error = 'Failed to load orders';
                this.loading = false;
                console.error(error);
            }
        });
    }

    shipOrder(orderId: number) {
        if (confirm('Are you sure you want to ship this order?')) {
            this.orderService.updateStatus(orderId, 'SHIPPED', undefined).subscribe({
                next: () => {
                    alert('Order status updated to SHIPPED');
                    this.loadOrders();
                },
                error: (err: any) => console.error(err)
            });
        }
    }

    deliverOrder(orderId: number) {
        if (confirm('Are you sure you want to deliver this order?')) {
            this.orderService.updateStatus(orderId, 'DELIVERED', undefined).subscribe({
                next: () => {
                    alert('Order status updated to DELIVERED');
                    this.loadOrders();
                },
                error: (err: any) => console.error(err)
            });
        }
    }

    markAsPaid(orderId: number) {
        if (confirm('Are you sure you want to mark this order as PAID?')) {
            this.orderService.updateStatus(orderId, undefined, 'COMPLETED').subscribe({
                next: () => {
                    alert('Payment status updated successfully');
                    this.loadOrders();
                },
                error: (err: any) => console.error(err)
            });
        }
    }
}
