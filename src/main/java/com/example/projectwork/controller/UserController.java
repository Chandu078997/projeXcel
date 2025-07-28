package com.example.projectwork.controller;

import com.example.projectwork.entity.User;
import com.example.projectwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5174"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
/*
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }*/
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<User> user = userRepository.findByEmailAndPassword(email, password);

        if (user.isPresent()) {
            // Return user details (id, name, email, role) so frontend can use them
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

}
