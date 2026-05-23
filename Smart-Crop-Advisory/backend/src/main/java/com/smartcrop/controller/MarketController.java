package com.smartcrop.controller;

import com.smartcrop.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MarketController {

    @Autowired
    private MarketService marketService;

    @GetMapping("/market")
    public ResponseEntity<List<Map<String, Object>>> getMarketPrices() {
        List<Map<String, Object>> response = marketService.getMarketData();
        return ResponseEntity.ok(response);
    }
}
