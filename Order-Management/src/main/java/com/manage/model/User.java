package com.manage.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer user_id; // Matches your diagram

	@Column(unique = true, nullable = false)
	@jakarta.validation.constraints.NotNull(message = "Username cannot be empty")
	@jakarta.validation.constraints.Size(min = 3, message = "Username must be at least 3 characters")
	private String username;

	@Column(nullable = false)
	@jakarta.validation.constraints.NotNull(message = "Password cannot be empty")
	@jakarta.validation.constraints.Size(min = 5, message = "Password must be at least 5 characters")
	private String password;

	@jakarta.validation.constraints.Email(message = "Email should be valid")
	@jakarta.validation.constraints.NotNull(message = "Email cannot be empty")
	private String email;
	private String role; // e.g., "ROLE_USER" or "ROLE_ADMIN"

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}