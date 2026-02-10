import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    loading = true;

    constructor(
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe({
            next: (data: Product[]) => {
                this.products = data;
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            }
        });
    }

    addToCart(product: Product) {
        if (this.cartService.addToCart(product)) {
            alert('Added to cart successfully!');
        } else {
            alert(`Sorry, there are only ${product.stock_quantity} stocks available`);
        }
    }
}
