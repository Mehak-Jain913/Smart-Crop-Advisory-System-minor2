package com.smartcrop.controller;

import com.smartcrop.dto.RecommendRequest;
import com.smartcrop.dto.RecommendResponse;
import com.smartcrop.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping("/recommend")
    public ResponseEntity<RecommendResponse> recommend(@RequestBody RecommendRequest request) {
        RecommendResponse response = recommendationService.getRecommendation(request);
        return ResponseEntity.ok(response);
    }
}
