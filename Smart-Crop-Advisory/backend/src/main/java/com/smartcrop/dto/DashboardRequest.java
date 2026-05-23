package com.smartcrop.dto;

public class DashboardRequest {
    private Double lat;
    private Double lon;

    public DashboardRequest() {}

    public DashboardRequest(Double lat, Double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    // Getters and Setters
    public Double getLat() { return lat; }
    public void setLat(Double lat) { this.lat = lat; }

    public Double getLon() { return lon; }
    public void setLon(Double lon) { this.lon = lon; }
}
