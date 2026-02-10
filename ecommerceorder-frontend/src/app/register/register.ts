import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.html',
    styleUrls: ['./register.css']
})
export class RegisterComponent {
    username = '';
    email = '';
    password = '';
    role = 'user'; // default role
    errorMessage = '';
    successMessage = '';
    loading = false;

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        // ✅ Prevent admin registration logic
        if (this.username.toLowerCase() === 'admin' || this.email.toLowerCase().includes('admin')) {
            this.errorMessage = 'Admin username/email cannot be used.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const userData = {
            username: this.username,
            email: this.email,
            password: this.password,
            role: 'USER' // Enforce USER role for registration
        };

        // Note: register method might need to be added to AuthService if not present, checking...
        // AuthService had login/logout. I need to ensure register exists. 
        // If not, I'll mock it or add it.

        this.authService.register(userData).subscribe({
            next: (response: any) => {
                this.successMessage = response.message || 'Registration successful! Redirecting to login...';
                this.loading = false;
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error: (err) => {
                this.loading = false;
                console.error('Registration error:', err);
                if (err.error && err.error.message) {
                    this.errorMessage = err.error.message;
                } else if (typeof err.error === 'string') {
                    this.errorMessage = err.error;
                } else {
                    this.errorMessage = 'Registration failed. Please try again.';
                }
            }
        });
    }
}
