package com.manage.controller;

import com.manage.model.User;
import com.manage.dto.UserDTO; // Import your new DTO
import com.manage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login attempt for user: " + loginRequest.getUsername());
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isPresent()) {
            System.out.println("User found.");
            if (userOpt.get().getPassword().equals(loginRequest.getPassword())) {
                System.out.println("Password match. returning token.");
                User user = userOpt.get();
                UserDTO response = new UserDTO(
                        user.getUser_id(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole());
                return ResponseEntity.ok(response);
            } else {
                System.out.println("Password mismatch.");
            }
        } else {
            System.out.println("User not found.");
        }
        return ResponseEntity.status(401)
                .body(java.util.Collections.singletonMap("message", "Invalid username or password"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@jakarta.validation.Valid @RequestBody User user) {
        System.out.println("Register attempt: " + user.getUsername() + ", Email: " + user.getEmail());

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            System.out.println("Username taken.");
            return ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message", "Username is already taken!"));
        }

        if (user.getEmail() != null && userRepository.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("Email taken.");
            return ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message", "Email is already in use!"));
        }

        // Block "admin" in username or email (Case Insensitive)
        if (user.getUsername().toLowerCase().contains("admin") ||
                (user.getEmail() != null && user.getEmail().toLowerCase().contains("admin"))) {
            return ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message",
                            "Registration forbidden: Username or Email cannot contain 'admin'"));
        }

        // Force ROLE_USER regardless of what was sent in the request
        user.setRole("ROLE_USER");
        System.out.println("Saving user...");
        userRepository.save(user);
        System.out.println("User saved successfully.");

        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "User registered successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        System.out.println("Logout called.");
        return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Logged out successfully"));
    }
}