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
    newProduct: any = { name: '', price: 0, stock_quantity: 0, description: '', imageUrl: '' };
    editProduct: any = null;
    showAddForm = false;
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

    toggleAddForm() {
        this.showAddForm = !this.showAddForm;
        if (this.showAddForm) {
            this.editProduct = null;
            this.scrollToTop();
        }
    }

    addProduct() {
        if (this.newProduct.price < 0 || this.newProduct.stock_quantity < 1) {
            this.errorMessage = 'Product stock should be minimum one';
            return;
        }
        this.productService.addProduct(this.newProduct).subscribe({
            next: () => {
                alert('Product added successfully');
                this.loadProducts();
                this.newProduct = { name: '', price: 0, stock_quantity: 1, description: '', imageUrl: '' };
                this.showAddForm = false;
            },
            error: () => this.errorMessage = 'Failed to add product'
        });
    }

    startEdit(product: any) {
        this.editProduct = { ...product };
        this.showAddForm = false;
        this.scrollToTop();
    }

    cancelEdit() {
        this.editProduct = null;
    }

    saveEdit() {
        if (!this.editProduct) return;
        if (this.editProduct.price < 0 || this.editProduct.stock_quantity < 1) {
            this.errorMessage = 'Product stock should be minimum one';
            return;
        }
        this.productService.updateProduct(this.editProduct).subscribe({
            next: () => {
                alert('Product updated successfully');
                this.loadProducts();
                this.editProduct = null;
            },
            error: (err) => {
                console.error('Update error:', err);
                const message = err.error?.message || err.error || 'Check server logs';
                this.errorMessage = `Update failed: ${message}`;
            }
        });
    }

    deleteProduct(id: number) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => {
                    alert('Product deleted successfully');
                    this.loadProducts();
                },
                error: () => this.errorMessage = 'Failed to delete product'
            });
        }
    }

    private scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
