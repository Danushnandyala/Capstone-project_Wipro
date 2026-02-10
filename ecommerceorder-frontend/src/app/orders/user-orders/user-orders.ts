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
    userId: number = 1; // Default or fetch from auth

    constructor(private orderService: OrderService, private authService: AuthService) {
        // Try to get userId from auth if possible, or assume 1 for demo
        // const user = this.authService.getUser();
        // if(user) this.userId = user.user_id;
    }

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders() {
        this.orderService.getUserOrders(this.userId).subscribe({
            next: (res) => {
                this.orders = res;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }
}
