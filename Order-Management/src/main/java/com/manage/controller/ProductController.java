package com.manage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manage.model.Product;
import com.manage.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    // Create a Product
    @PostMapping
    public ResponseEntity<?> createProduct(@jakarta.validation.Valid @RequestBody Product product) {
        try {
            product.setProduct_id(null); // Ensure Insert, not Update
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            e.printStackTrace(); // Log to console
            return ResponseEntity.badRequest().body("Error saving product: " + e.getMessage());
        }
    }

    // Get all Products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(
                        () -> new com.manage.exception.ResourceNotFoundException("Product not found with id: " + id));
        return ResponseEntity.ok().body(product);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Integer id,
            @jakarta.validation.Valid @RequestBody Product productDetails) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new com.manage.exception.ResourceNotFoundException(
                            "Product not found with id: " + id));

            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setStock_quantity(productDetails.getStock_quantity());
            product.setDescription(productDetails.getDescription());
            product.setImageUrl(productDetails.getImageUrl());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok(updatedProduct);

        } catch (com.manage.exception.ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating product: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(
                        () -> new com.manage.exception.ResourceNotFoundException("Product not found with id: " + id));

        productRepository.delete(product);
        return ResponseEntity.ok().build();
    }
}
