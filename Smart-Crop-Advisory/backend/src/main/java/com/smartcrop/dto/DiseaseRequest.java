package com.smartcrop.dto;

public class DiseaseRequest {
    private String imageBase64;
    private String mimeType;

    public DiseaseRequest() {}

    public DiseaseRequest(String imageBase64, String mimeType) {
        this.imageBase64 = imageBase64;
        this.mimeType = mimeType;
    }

    // Getters and Setters
    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }
}
