package com.smartcrop.service;

import org.springframework.stereotype.Service;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketService {

    private static final List<BaseCropPrice> BASE_PRICES = new ArrayList<>();

    static {
        BASE_PRICES.add(new BaseCropPrice("Wheat", 2125, "Punjab", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Rice (Basmati)", 4200, "Haryana", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Rice (Common)", 1940, "UP", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Cotton", 6080, "Gujarat", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Sugarcane", 315, "Maharashtra", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Maize", 1962, "Bihar", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Soybean", 4300, "MP", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Mustard", 5400, "Rajasthan", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Chickpea (Chana)", 5200, "MP", "₹/Qtl"));
        BASE_PRICES.add(new BaseCropPrice("Turmeric", 7800, "Telangana", "₹/Qtl"));
    }

    public List<Map<String, Object>> getMarketData() {
        long seed = System.currentTimeMillis() / (1000 * 60 * 30); // updates every 30 minutes
        List<Map<String, Object>> marketList = new ArrayList<>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("hh:mm:ss a");
        String lastUpdated = LocalTime.now().format(dtf);

        for (int idx = 0; idx < BASE_PRICES.size(); idx++) {
            BaseCropPrice item = BASE_PRICES.get(idx);
            
            double variation = Math.sin(seed + idx) * 0.04; // ±4% fluctuation
            int price = (int) Math.round(item.base * (1 + variation));
            
            double prevVariation = Math.sin((seed - 1) + idx) * 0.04;
            int prevPrice = (int) Math.round(item.base * (1 + prevVariation));
            
            String trend;
            if (price > prevPrice) {
                trend = "up";
            } else if (price < prevPrice) {
                trend = "down";
            } else {
                trend = "stable";
            }
            
            double pctChange = ((double)(price - prevPrice) / prevPrice) * 100.0;
            String changePctStr = String.format("%.1f%%", pctChange);
            if (pctChange > 0) {
                changePctStr = "+" + changePctStr;
            }

            Map<String, Object> map = new HashMap<>();
            map.put("id", idx + 1);
            map.put("crop", item.crop);
            map.put("price", String.format("₹%,d / Qtl", price));
            map.put("priceRaw", price);
            map.put("location", item.location);
            map.put("trend", trend);
            map.put("change", changePctStr);
            map.put("unit", item.unit);
            map.put("lastUpdated", lastUpdated);

            marketList.add(map);
        }

        return marketList;
    }

    private static class BaseCropPrice {
        String crop;
        int base;
        String location;
        String unit;

        BaseCropPrice(String crop, int base, String location, String unit) {
            this.crop = crop;
            this.base = base;
            this.location = location;
            this.unit = unit;
        }
    }
}
