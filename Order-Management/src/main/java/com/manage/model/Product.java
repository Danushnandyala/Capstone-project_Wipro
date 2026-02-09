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

	private String name;
	private Double price;
	private Integer stock_quantity;
	@Column(length = 1000)
	private String description;

	@Column(name = "image_url", length = 1000)
	private String imageUrl; // URL to the product image
}