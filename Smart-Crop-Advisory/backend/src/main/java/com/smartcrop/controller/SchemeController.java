package com.smartcrop.controller;

import com.smartcrop.entity.Scheme;
import com.smartcrop.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SchemeController {

    @Autowired
    private SchemeRepository schemeRepository;

    @PostMapping("/schemes")
    public ResponseEntity<List<Scheme>> getSchemesPost() {
        List<Scheme> schemes = schemeRepository.findAll();
        return ResponseEntity.ok(schemes);
    }

    @GetMapping("/schemes")
    public ResponseEntity<List<Scheme>> getSchemesGet() {
        List<Scheme> schemes = schemeRepository.findAll();
        return ResponseEntity.ok(schemes);
    }
}
