package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, length = 255)
    private String location;

    @Column(name = "soil_type", nullable = false, length = 50)
    private String soilType;

    @Column(name = "land_area", nullable = false)
    private Double landArea;

    @Column(nullable = false, length = 50)
    private String season;

    @Column(nullable = false, length = 150)
    private String crop;

    @Column(name = "expected_yield", length = 100)
    private String expectedYield;

    @Column(length = 100)
    private String profit;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(name = "mix_farming_suggestion", length = 255)
    private String mixFarmingSuggestion;

    @Column(name = "mix_farming_benefit", length = 255)
    private String mixFarmingBenefit;

    @Column(name = "mix_farming_profit_increase", length = 100)
    private String mixFarmingProfitIncrease;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "recommendation_tips", joinColumns = @JoinColumn(name = "recommendation_id"))
    @Column(name = "tip_text", columnDefinition = "TEXT")
    private List<String> tips = new ArrayList<>();

    @Column(name = "raw_ai", columnDefinition = "TEXT")
    private String rawAI;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Recommendation() {}

    public Recommendation(Long id, Long userId, String location, String soilType, Double landArea, String season, String crop, String expectedYield, String profit, String reason, String mixFarmingSuggestion, String mixFarmingBenefit, String mixFarmingProfitIncrease, List<String> tips, String rawAI, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.location = location;
        this.soilType = soilType;
        this.landArea = landArea;
        this.season = season;
        this.crop = crop;
        this.expectedYield = expectedYield;
        this.profit = profit;
        this.reason = reason;
        this.mixFarmingSuggestion = mixFarmingSuggestion;
        this.mixFarmingBenefit = mixFarmingBenefit;
        this.mixFarmingProfitIncrease = mixFarmingProfitIncrease;
        this.tips = tips != null ? tips : new ArrayList<>();
        this.rawAI = rawAI;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public Double getLandArea() { return landArea; }
    public void setLandArea(Double landArea) { this.landArea = landArea; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getExpectedYield() { return expectedYield; }
    public void setExpectedYield(String expectedYield) { this.expectedYield = expectedYield; }

    public String getProfit() { return profit; }
    public void setProfit(String profit) { this.profit = profit; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getMixFarmingSuggestion() { return mixFarmingSuggestion; }
    public void setMixFarmingSuggestion(String mixFarmingSuggestion) { this.mixFarmingSuggestion = mixFarmingSuggestion; }

    public String getMixFarmingBenefit() { return mixFarmingBenefit; }
    public void setMixFarmingBenefit(String mixFarmingBenefit) { this.mixFarmingBenefit = mixFarmingBenefit; }

    public String getMixFarmingProfitIncrease() { return mixFarmingProfitIncrease; }
    public void setMixFarmingProfitIncrease(String mixFarmingProfitIncrease) { this.mixFarmingProfitIncrease = mixFarmingProfitIncrease; }

    public List<String> getTips() { return tips; }
    public void setTips(List<String> tips) { this.tips = tips; }

    public String getRawAI() { return rawAI; }
    public void setRawAI(String rawAI) { this.rawAI = rawAI; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static RecommendationBuilder builder() {
        return new RecommendationBuilder();
    }

    public static class RecommendationBuilder {
        private Long id;
        private Long userId;
        private String location;
        private String soilType;
        private Double landArea;
        private String season;
        private String crop;
        private String expectedYield;
        private String profit;
        private String reason;
        private String mixFarmingSuggestion;
        private String mixFarmingBenefit;
        private String mixFarmingProfitIncrease;
        private List<String> tips = new ArrayList<>();
        private String rawAI;
        private LocalDateTime createdAt;

        RecommendationBuilder() {}

        public RecommendationBuilder id(Long id) { this.id = id; return this; }
        public RecommendationBuilder userId(Long userId) { this.userId = userId; return this; }
        public RecommendationBuilder location(String location) { this.location = location; return this; }
        public RecommendationBuilder soilType(String soilType) { this.soilType = soilType; return this; }
        public RecommendationBuilder landArea(Double landArea) { this.landArea = landArea; return this; }
        public RecommendationBuilder season(String season) { this.season = season; return this; }
        public RecommendationBuilder crop(String crop) { this.crop = crop; return this; }
        public RecommendationBuilder expectedYield(String expectedYield) { this.expectedYield = expectedYield; return this; }
        public RecommendationBuilder profit(String profit) { this.profit = profit; return this; }
        public RecommendationBuilder reason(String reason) { this.reason = reason; return this; }
        public RecommendationBuilder mixFarmingSuggestion(String mixFarmingSuggestion) { this.mixFarmingSuggestion = mixFarmingSuggestion; return this; }
        public RecommendationBuilder mixFarmingBenefit(String mixFarmingBenefit) { this.mixFarmingBenefit = mixFarmingBenefit; return this; }
        public RecommendationBuilder mixFarmingProfitIncrease(String mixFarmingProfitIncrease) { this.mixFarmingProfitIncrease = mixFarmingProfitIncrease; return this; }
        public RecommendationBuilder tips(List<String> tips) { this.tips = tips; return this; }
        public RecommendationBuilder rawAI(String rawAI) { this.rawAI = rawAI; return this; }
        public RecommendationBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Recommendation build() {
            return new Recommendation(id, userId, location, soilType, landArea, season, crop, expectedYield, profit, reason, mixFarmingSuggestion, mixFarmingBenefit, mixFarmingProfitIncrease, tips, rawAI, createdAt);
        }
    }
}
