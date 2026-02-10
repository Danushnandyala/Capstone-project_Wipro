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

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        // ✅ Prevent admin registration logic
        if (this.username.toLowerCase() === 'admin' || this.email.toLowerCase().includes('admin')) {
            this.errorMessage = 'Admin username/email cannot be used.';
            return;
        }

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
            next: () => {
                this.successMessage = 'Registered successfully!';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1500);
            },
            error: () => {
                this.errorMessage = 'Registration failed. Try again.';
            }
        });
    }
}
