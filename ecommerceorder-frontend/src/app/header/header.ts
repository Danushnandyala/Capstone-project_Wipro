import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
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

    userRole: string | null = null;
    userName: string | null = null;

    constructor() {
        this.userRole = this.authService.getRole() || null;
        this.userName = this.authService.getUsername() || localStorage.getItem('name');
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
