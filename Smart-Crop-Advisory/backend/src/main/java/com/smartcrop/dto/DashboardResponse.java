package com.smartcrop.dto;

import java.util.List;

public class DashboardResponse {
    private WeatherSummary weather;
    private String recommendedCrop;
    private String expectedYield;
    private String estimatedProfit;
    private Irrigation irrigation;
    private TopMarketCrop topMarketCrop;
    private List<YieldDataPoint> yieldData;
    private List<PriceDataPoint> priceData;
    private Stats stats;

    public DashboardResponse() {}

    public DashboardResponse(WeatherSummary weather, String recommendedCrop, String expectedYield, String estimatedProfit, Irrigation irrigation, TopMarketCrop topMarketCrop, List<YieldDataPoint> yieldData, List<PriceDataPoint> priceData, Stats stats) {
        this.weather = weather;
        this.recommendedCrop = recommendedCrop;
        this.expectedYield = expectedYield;
        this.estimatedProfit = estimatedProfit;
        this.irrigation = irrigation;
        this.topMarketCrop = topMarketCrop;
        this.yieldData = yieldData;
        this.priceData = priceData;
        this.stats = stats;
    }

    // Getters and Setters
    public WeatherSummary getWeather() { return weather; }
    public void setWeather(WeatherSummary weather) { this.weather = weather; }

    public String getRecommendedCrop() { return recommendedCrop; }
    public void setRecommendedCrop(String recommendedCrop) { this.recommendedCrop = recommendedCrop; }

    public String getExpectedYield() { return expectedYield; }
    public void setExpectedYield(String expectedYield) { this.expectedYield = expectedYield; }

    public String getEstimatedProfit() { return estimatedProfit; }
    public void setEstimatedProfit(String estimatedProfit) { this.estimatedProfit = estimatedProfit; }

    public Irrigation getIrrigation() { return irrigation; }
    public void setIrrigation(Irrigation irrigation) { this.irrigation = irrigation; }

    public TopMarketCrop getTopMarketCrop() { return topMarketCrop; }
    public void setTopMarketCrop(TopMarketCrop topMarketCrop) { this.topMarketCrop = topMarketCrop; }

    public List<YieldDataPoint> getYieldData() { return yieldData; }
    public void setYieldData(List<YieldDataPoint> yieldData) { this.yieldData = yieldData; }

    public List<PriceDataPoint> getPriceData() { return priceData; }
    public void setPriceData(List<PriceDataPoint> priceData) { this.priceData = priceData; }

    public Stats getStats() { return stats; }
    public void setStats(Stats stats) { this.stats = stats; }

    public static DashboardResponseBuilder builder() {
        return new DashboardResponseBuilder();
    }

    public static class DashboardResponseBuilder {
        private WeatherSummary weather;
        private String recommendedCrop;
        private String expectedYield;
        private String estimatedProfit;
        private Irrigation irrigation;
        private TopMarketCrop topMarketCrop;
        private List<YieldDataPoint> yieldData;
        private List<PriceDataPoint> priceData;
        private Stats stats;

        DashboardResponseBuilder() {}

        public DashboardResponseBuilder weather(WeatherSummary weather) { this.weather = weather; return this; }
        public DashboardResponseBuilder recommendedCrop(String recommendedCrop) { this.recommendedCrop = recommendedCrop; return this; }
        public DashboardResponseBuilder expectedYield(String expectedYield) { this.expectedYield = expectedYield; return this; }
        public DashboardResponseBuilder estimatedProfit(String estimatedProfit) { this.estimatedProfit = estimatedProfit; return this; }
        public DashboardResponseBuilder irrigation(Irrigation irrigation) { this.irrigation = irrigation; return this; }
        public DashboardResponseBuilder topMarketCrop(TopMarketCrop topMarketCrop) { this.topMarketCrop = topMarketCrop; return this; }
        public DashboardResponseBuilder yieldData(List<YieldDataPoint> yieldData) { this.yieldData = yieldData; return this; }
        public DashboardResponseBuilder priceData(List<PriceDataPoint> priceData) { this.priceData = priceData; return this; }
        public DashboardResponseBuilder stats(Stats stats) { this.stats = stats; return this; }

        public DashboardResponse build() {
            return new DashboardResponse(weather, recommendedCrop, expectedYield, estimatedProfit, irrigation, topMarketCrop, yieldData, priceData, stats);
        }
    }

    // Static nested classes
    public static class WeatherSummary {
        private String temperature;
        private String condition;
        private String humidity;

        public WeatherSummary() {}
        public WeatherSummary(String temperature, String condition, String humidity) {
            this.temperature = temperature;
            this.condition = condition;
            this.humidity = humidity;
        }

        public String getTemperature() { return temperature; }
        public void setTemperature(String temperature) { this.temperature = temperature; }
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
        public String getHumidity() { return humidity; }
        public void setHumidity(String humidity) { this.humidity = humidity; }

        public static WeatherSummaryBuilder builder() { return new WeatherSummaryBuilder(); }

        public static class WeatherSummaryBuilder {
            private String temperature;
            private String condition;
            private String humidity;
            public WeatherSummaryBuilder temperature(String temperature) { this.temperature = temperature; return this; }
            public WeatherSummaryBuilder condition(String condition) { this.condition = condition; return this; }
            public WeatherSummaryBuilder humidity(String humidity) { this.humidity = humidity; return this; }
            public WeatherSummary build() { return new WeatherSummary(temperature, condition, humidity); }
        }
    }

    public static class Irrigation {
        private String requirement;
        private String timing;

        public Irrigation() {}
        public Irrigation(String requirement, String timing) {
            this.requirement = requirement;
            this.timing = timing;
        }

        public String getRequirement() { return requirement; }
        public void setRequirement(String requirement) { this.requirement = requirement; }
        public String getTiming() { return timing; }
        public void setTiming(String timing) { this.timing = timing; }

        public static IrrigationBuilder builder() { return new IrrigationBuilder(); }

        public static class IrrigationBuilder {
            private String requirement;
            private String timing;
            public IrrigationBuilder requirement(String requirement) { this.requirement = requirement; return this; }
            public IrrigationBuilder timing(String timing) { this.timing = timing; return this; }
            public Irrigation build() { return new Irrigation(requirement, timing); }
        }
    }

    public static class TopMarketCrop {
        private String name;
        private String price;
        private String trend;

        public TopMarketCrop() {}
        public TopMarketCrop(String name, String price, String trend) {
            this.name = name;
            this.price = price;
            this.trend = trend;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPrice() { return price; }
        public void setPrice(String price) { this.price = price; }
        public String getTrend() { return trend; }
        public void setTrend(String trend) { this.trend = trend; }

        public static TopMarketCropBuilder builder() { return new TopMarketCropBuilder(); }

        public static class TopMarketCropBuilder {
            private String name;
            private String price;
            private String trend;
            public TopMarketCropBuilder name(String name) { this.name = name; return this; }
            public TopMarketCropBuilder price(String price) { this.price = price; return this; }
            public TopMarketCropBuilder trend(String trend) { this.trend = trend; return this; }
            public TopMarketCrop build() { return new TopMarketCrop(name, price, trend); }
        }
    }

    public static class YieldDataPoint {
        private String name;
        private Double yield;

        public YieldDataPoint() {}
        public YieldDataPoint(String name, Double yield) {
            this.name = name;
            this.yield = yield;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Double getYield() { return yield; }
        public void setYield(Double yield) { this.yield = yield; }
    }

    public static class PriceDataPoint {
        private String name;
        private Double price;

        public PriceDataPoint() {}
        public PriceDataPoint(String name, Double price) {
            this.name = name;
            this.price = price;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
    }

    public static class Stats {
        private Long totalUsers;
        private Long totalRecommendations;

        public Stats() {}
        public Stats(Long totalUsers, Long totalRecommendations) {
            this.totalUsers = totalUsers;
            this.totalRecommendations = totalRecommendations;
        }

        public Long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
        public Long getTotalRecommendations() { return totalRecommendations; }
        public void setTotalRecommendations(Long totalRecommendations) { this.totalRecommendations = totalRecommendations; }

        public static StatsBuilder builder() { return new StatsBuilder(); }

        public static class StatsBuilder {
            private Long totalUsers;
            private Long totalRecommendations;
            public StatsBuilder totalUsers(Long totalUsers) { this.totalUsers = totalUsers; return this; }
            public StatsBuilder totalRecommendations(Long totalRecommendations) { this.totalRecommendations = totalRecommendations; return this; }
            public Stats build() { return new Stats(totalUsers, totalRecommendations); }
        }
    }
}
