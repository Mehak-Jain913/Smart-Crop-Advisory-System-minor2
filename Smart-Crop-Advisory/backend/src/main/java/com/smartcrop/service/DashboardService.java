package com.smartcrop.service;

import com.smartcrop.dto.DashboardRequest;
import com.smartcrop.dto.DashboardResponse;
import com.smartcrop.dto.WeatherResponse;
import com.smartcrop.repository.RecommendationRepository;
import com.smartcrop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private MarketService marketService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecommendationRepository recommendationRepository;

    public DashboardResponse getDashboardData(DashboardRequest request) {
        Double lat = (request != null) ? request.getLat() : null;
        Double lon = (request != null) ? request.getLon() : null;

        // 1. Weather Summary
        DashboardResponse.WeatherSummary weatherSummary;
        try {
            WeatherResponse wResponse = weatherService.getWeather(
                (lat != null) ? lat : 22.6356, 
                (lon != null) ? lon : 75.8875
            );
            weatherSummary = DashboardResponse.WeatherSummary.builder()
                    .temperature(wResponse.getCurrent().getTemperature())
                    .condition(wResponse.getCurrent().getCondition())
                    .humidity(wResponse.getCurrent().getHumidity())
                    .build();
        } catch (Exception e) {
            weatherSummary = DashboardResponse.WeatherSummary.builder()
                    .temperature("28°C")
                    .condition("Clear")
                    .humidity("65%")
                    .build();
        }

        // 2. Top Trending Market Crop
        List<Map<String, Object>> marketData = marketService.getMarketData();
        Map<String, Object> topCropMap = marketData.stream()
                .filter(m -> "up".equalsIgnoreCase((String) m.get("trend")))
                .sorted((a, b) -> Integer.compare((Integer) b.get("priceRaw"), (Integer) a.get("priceRaw")))
                .findFirst()
                .orElse(null);

        DashboardResponse.TopMarketCrop topCrop = null;
        if (topCropMap != null) {
            topCrop = DashboardResponse.TopMarketCrop.builder()
                    .name((String) topCropMap.get("crop"))
                    .price((String) topCropMap.get("price"))
                    .trend((String) topCropMap.get("trend"))
                    .build();
        }

        // 3. Database Statistics
        long totalUsers = userRepository.count();
        long totalRecommendations = recommendationRepository.count();

        // 4. Yield Chart Data
        List<DashboardResponse.YieldDataPoint> yieldData = new ArrayList<>();
        yieldData.add(new DashboardResponse.YieldDataPoint("Jan", 400.0));
        yieldData.add(new DashboardResponse.YieldDataPoint("Feb", 300.0));
        yieldData.add(new DashboardResponse.YieldDataPoint("Mar", 550.0));
        yieldData.add(new DashboardResponse.YieldDataPoint("Apr", 480.0));
        yieldData.add(new DashboardResponse.YieldDataPoint("May", 700.0));
        yieldData.add(new DashboardResponse.YieldDataPoint("Jun", 650.0));

        // 5. Price Chart Data (Take first 4 crops)
        List<DashboardResponse.PriceDataPoint> priceData = marketData.stream()
                .limit(4)
                .map(m -> {
                    String name = ((String) m.get("crop")).split(" ")[0];
                    Integer priceRaw = (Integer) m.get("priceRaw");
                    return new DashboardResponse.PriceDataPoint(name, priceRaw.doubleValue());
                })
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .weather(weatherSummary)
                .recommendedCrop("Wheat")
                .expectedYield("7.2 Tons")
                .estimatedProfit("₹1.4 Lakhs")
                .irrigation(DashboardResponse.Irrigation.builder()
                        .requirement("15 mm Water")
                        .timing("Tomorrow, 6:00 AM")
                        .build())
                .topMarketCrop(topCrop)
                .yieldData(yieldData)
                .priceData(priceData)
                .stats(DashboardResponse.Stats.builder()
                        .totalUsers(totalUsers)
                        .totalRecommendations(totalRecommendations)
                        .build())
                .build();
    }
}
