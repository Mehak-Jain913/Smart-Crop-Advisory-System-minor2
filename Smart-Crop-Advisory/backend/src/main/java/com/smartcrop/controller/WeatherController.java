package com.smartcrop.controller;

import com.smartcrop.dto.WeatherResponse;
import com.smartcrop.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather")
    public ResponseEntity<WeatherResponse> getWeather(
            @RequestParam(value = "lat", required = false) Double lat,
            @RequestParam(value = "lon", required = false) Double lon) {
        WeatherResponse response = weatherService.getWeather(lat, lon);
        return ResponseEntity.ok(response);
    }
}
