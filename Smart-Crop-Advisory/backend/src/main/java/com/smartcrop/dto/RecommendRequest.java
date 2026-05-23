package com.smartcrop.dto;

public class RecommendRequest {
    private String location;
    private String soilType;
    private Double landArea;
    private String season;
    private Long userId;

    public RecommendRequest() {}

    public RecommendRequest(String location, String soilType, Double landArea, String season, Long userId) {
        this.location = location;
        this.soilType = soilType;
        this.landArea = landArea;
        this.season = season;
        this.userId = userId;
    }

    // Getters and Setters
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public Double getLandArea() { return landArea; }
    public void setLandArea(Double landArea) { this.landArea = landArea; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
