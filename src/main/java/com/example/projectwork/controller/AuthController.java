package com.example.projectwork.controller;

import com.example.projectwork.entity.User;
import com.example.projectwork.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174",
             "https://projexecelfrontend.netlify.app",       // Your deployed frontend
    "https://projexcel-production.up.railway.app",
                       "https://projexcel-1.onrender.com"}
            )
public class AuthController {

    private final AuthService authService = new AuthService();

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        return ResponseEntity.ok(authService.login(user.getEmail(), user.getPassword()));
    }
}
