package com.smartcrop.controller;

import com.smartcrop.dto.ProfileRequest;
import com.smartcrop.entity.User;
import com.smartcrop.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ProfileController {

    @Autowired
    private AuthService authService;

    // Direct root endpoint mapped to match 'axios.post("http://localhost:5001/profile")'
    @PostMapping("/profile")
    public ResponseEntity<Map<String, User>> getProfileRoot(@RequestBody ProfileRequest request) {
        User user = authService.getProfile(request.getEmail());
        Map<String, User> response = new HashMap<>();
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    // Direct api endpoint mapped as backup
    @PostMapping("/api/profile")
    public ResponseEntity<Map<String, User>> getProfileApi(@RequestBody ProfileRequest request) {
        User user = authService.getProfile(request.getEmail());
        Map<String, User> response = new HashMap<>();
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}
