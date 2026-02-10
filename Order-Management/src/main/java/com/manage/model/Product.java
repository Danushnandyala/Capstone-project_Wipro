package com.manage.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer product_id;

	@jakarta.validation.constraints.NotNull(message = "Name cannot be null")
	private String name;

	@jakarta.validation.constraints.NotNull(message = "Price cannot be null")
	@jakarta.validation.constraints.Min(value = 0, message = "Price must be at least 0")
	private Double price;

	@jakarta.validation.constraints.NotNull(message = "Stock quantity cannot be null")
	@jakarta.validation.constraints.Min(value = 1, message = "Product stock should be minimum one")
	private Integer stock_quantity;

	@Column(length = 1000)
	private String description;

	@Column(name = "image_url", length = 1000)
	private String imageUrl; // URL to the product image
}