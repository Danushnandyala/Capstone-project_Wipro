import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    username = '';
    password = '';
    loading = false;
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.loading = true;
        this.error = '';

        this.authService.login(this.username, this.password).subscribe({
            next: (user) => {
                this.loading = false;
                // Redirect based on role
                if (user.role === 'ADMIN') {
                    this.router.navigate(['/admin']); // Admin Dashboard
                } else {
                    this.router.navigate(['/user']); // User Dashboard
                }
            },
            error: (err) => {
                console.error(err);
                if (err.error && err.error.message) {
                    this.error = err.error.message;
                } else {
                    this.error = 'Invalid username or password';
                }
                this.loading = false;
            }
        });
    }
}
