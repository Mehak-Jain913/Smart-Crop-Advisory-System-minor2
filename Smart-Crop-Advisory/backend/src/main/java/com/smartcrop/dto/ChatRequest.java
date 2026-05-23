package com.smartcrop.dto;

public class ChatRequest {
    private String message;
    private String sessionId;
    private Long userId;

    public ChatRequest() {}

    public ChatRequest(String message, String sessionId, Long userId) {
        this.message = message;
        this.sessionId = sessionId;
        this.userId = userId;
    }

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
