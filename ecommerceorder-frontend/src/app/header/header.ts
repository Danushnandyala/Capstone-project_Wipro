import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent {
    public authService = inject(AuthService);
    private router = inject(Router);
    private orderService = inject(OrderService);

    userRole: string | null = null;
    userName: string | null = null;
    orderCount: number = 0;

    constructor() {
        this.authService.user$.subscribe(user => {
            if (user) {
                this.userRole = user.role;
                this.userName = user.username;
                if (this.userRole === 'USER') {
                    this.loadOrderCount();
                }
            } else {
                this.userRole = null;
                this.userName = null;
                this.orderCount = 0;
            }
        });
    }

    loadOrderCount() {
        const user = this.authService.getUser();
        if (user && user.user_id) {
            this.orderService.getUserOrders(user.user_id).subscribe({
                next: (orders: any[]) => {
                    this.orderCount = orders.length;
                },
                error: (err: any) => {
                    console.error('Failed to load order count', err);
                    this.orderCount = 0;
                }
            });
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
