import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-wrapper">
      <nav class="top-nav">
        <div class="brand">
          <i class="bi bi-shield-lock-fill"></i> Admin Panel
        </div>
        <ul class="nav-links">
          <li>
            <a routerLink="manage-products" routerLinkActive="active">
              <i class="bi bi-box-seam"></i> Products
            </a>
          </li>
          <li>
            <a routerLink="all-orders" routerLinkActive="active">
              <i class="bi bi-list-check"></i> Orders
            </a>
          </li>
        </ul>
      </nav>
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { display: flex; flex-direction: column; height: 100vh; }
    .top-nav { height: 70px; background: #2c3e50; color: white; display: flex; align-items: center; padding: 0 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
    .brand { font-size: 1.5rem; font-weight: bold; margin-right: 3rem; display: flex; align-items: center; color: #ecf0f1; }
    .brand i { margin-right: 10px; color: #3498db; }
    .nav-links { list-style: none; padding: 0; margin: 0; display: flex; flex: 1; gap: 1rem; }
    .nav-links a { display: flex; align-items: center; padding: 8px 15px; color: #bdc3c7; text-decoration: none; border-radius: 5px; transition: all 0.3s; font-weight: 500; }
    .nav-links a:hover, .nav-links a.active { background: #34495e; color: white; }
    .nav-links i { margin-right: 8px; }
    .content-area { flex: 1; padding: 2rem; overflow-y: auto; background: #f8f9fa; }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) { }
}
