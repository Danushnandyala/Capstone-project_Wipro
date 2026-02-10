import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-manage-products',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './manage-products.html',
    styleUrls: ['./manage-products.css']
})
export class ManageProductsComponent implements OnInit {
    products: Product[] = [];
    newProduct: any = { name: '', price: 0, stock_quantity: 0, description: '' };
    editProduct: any = null;
    errorMessage = '';

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.getAllProducts().subscribe({
            next: (res) => this.products = res,
            error: () => this.errorMessage = 'Failed to load products'
        });
    }

    addProduct() {
        this.productService.addProduct(this.newProduct).subscribe({
            next: () => {
                this.loadProducts();
                this.newProduct = { name: '', price: 0, stock_quantity: 0, description: '' };
            },
            error: () => this.errorMessage = 'Failed to add product'
        });
    }

    startEdit(product: any) {
        this.editProduct = { ...product };
    }

    saveEdit() {
        if (!this.editProduct) return;
        this.productService.updateProduct(this.editProduct).subscribe({
            next: () => {
                this.loadProducts();
                this.editProduct = null;
            },
            error: () => this.errorMessage = 'Failed to update product'
        });
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => this.loadProducts(),
                error: () => this.errorMessage = 'Failed to delete product'
            });
        }
    }
}
