package com.smartcrop.dto;

public class ProfileRequest {
    private String email;

    public ProfileRequest() {}

    public ProfileRequest(String email) {
        this.email = email;
    }

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
