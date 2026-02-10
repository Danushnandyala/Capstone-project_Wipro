import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProductListComponent } from './products/product-list/product-list';
import { ManageProductsComponent } from './products/manage-products/manage-products';
import { AllOrdersComponent } from './orders/all-orders/all-orders';
import { UserOrdersComponent } from './orders/user-orders/user-orders';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard';
import { CartComponent } from './cart/cart';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Admin Routes
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { requiredRole: 'ADMIN' },
        children: [
            { path: '', redirectTo: 'manage-products', pathMatch: 'full' },
            { path: 'manage-products', component: ManageProductsComponent },
            { path: 'all-orders', component: AllOrdersComponent }
        ]
    },

    // User Routes
    {
        path: 'user',
        component: UserDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { requiredRole: 'ROLE_USER' },
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            { path: 'products', component: ProductListComponent },
            { path: 'cart', component: CartComponent },
            { path: 'orders', component: UserOrdersComponent }
        ]
    },

    { path: '**', redirectTo: 'login' }
];
