package com.smartcrop.controller;

import com.smartcrop.dto.DashboardRequest;
import com.smartcrop.dto.DashboardResponse;
import com.smartcrop.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @PostMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboardData(@RequestBody(required = false) DashboardRequest request) {
        DashboardResponse response = dashboardService.getDashboardData(request);
        return ResponseEntity.ok(response);
    }
}
