package com.smartcrop.controller;

import com.smartcrop.dto.AuthResponse;
import com.smartcrop.dto.LoginRequest;
import com.smartcrop.dto.RegisterRequest;
import com.smartcrop.entity.User;
import com.smartcrop.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, User>> getMe(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = authService.getMe(authHeader);
        Map<String, User> response = new HashMap<>();
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}
