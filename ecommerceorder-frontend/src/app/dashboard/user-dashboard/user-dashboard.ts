import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <nav class="top-nav">
        <div class="container d-flex justify-content-center gap-4">
            <a routerLink="products" routerLinkActive="active" class="nav-link">
              <i class="bi bi-grid me-2"></i> Available Products
            </a>
            <a routerLink="cart" routerLinkActive="active" class="nav-link">
              <i class="bi bi-bag me-2"></i> Cart
              <span class="badge bg-warning text-dark ms-2" *ngIf="(cartService.cart$ | async)?.length as count">{{ count }}</span>
            </a>
            <a routerLink="orders" routerLinkActive="active" class="nav-link">
              <i class="bi bi-clock-history me-2"></i> My Orders
            </a>
        </div>
      </nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container { min-height: 100vh; background: #f8f9fa; }
    .top-nav { background: #fff; border-bottom: 1px solid #eee; padding: 1rem 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .nav-link { color: #666; text-decoration: none; padding: 0.5rem 1rem; border-radius: 50px; font-weight: 500; transition: all 0.3s; display: flex; align-items: center; }
    .nav-link:hover, .nav-link.active { background: #eef2ff; color: #667eea; font-weight: 600; }
    .content { padding: 2rem; max-width: 1400px; margin: 0 auto; }
  `]
})
export class UserDashboardComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) { }
}
