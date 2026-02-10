import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { ProductListComponent } from './products/product-list/product-list';
import { ManageProductsComponent } from './products/manage-products/manage-products';
import { AllOrdersComponent } from './orders/all-orders/all-orders';
import { UserOrdersComponent } from './orders/user-orders/user-orders';
// import { AuthGuard } from './guards/auth.guard'; // If I have one. I'll skip for now to avoid errors if it's missing.

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'products/product-list',
        component: ProductListComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'products/manage-products',
        component: ManageProductsComponent,
        // canActivate: [AuthGuard] // data: { role: 'ADMIN' }
    },
    {
        path: 'orders/all-orders',
        component: AllOrdersComponent,
        // canActivate: [AuthGuard] // data: { role: 'ADMIN' }
    },
    {
        path: 'orders/user-orders',
        component: UserOrdersComponent,
        // canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'login' }
];
