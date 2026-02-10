import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stockQuantity', 'actions'];

    constructor(private productService: ProductService, private router: Router) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getAllProducts().subscribe({
            next: (data: Product[]) => {
                this.products = data;
            },
            error: (err: any) => {
                console.error('Error fetching products', err);
            }
        });
    }

    addToCart(product: Product) {
        // Placeholder for now, or navigate to place order
        this.router.navigate(['/orders/user-orders']);
    }
}
