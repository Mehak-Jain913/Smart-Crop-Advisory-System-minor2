package com.smartcrop.controller;

import com.smartcrop.dto.DiseaseRequest;
import com.smartcrop.dto.DiseaseResponse;
import com.smartcrop.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @PostMapping("/disease")
    public ResponseEntity<DiseaseResponse> detectDisease(@RequestBody DiseaseRequest request) {
        DiseaseResponse response = diseaseService.detectDisease(request);
        return ResponseEntity.ok(response);
    }
}
