import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getUser();
    const requiredRole = route.data['requiredRole'];

    if (!user) {
        return router.createUrlTree(['/login']);
    }

    if (user.role === requiredRole) {
        return true;
    }

    // Redirect to their own dashboard if they are in the wrong place
    if (user.role === 'ADMIN') {
        return router.createUrlTree(['/admin']);
    } else {
        return router.createUrlTree(['/user']);
    }
};
