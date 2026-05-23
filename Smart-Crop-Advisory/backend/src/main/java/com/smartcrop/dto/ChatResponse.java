package com.smartcrop.dto;

public class ChatResponse {
    private String reply;
    private String sessionId;

    public ChatResponse() {}

    public ChatResponse(String reply, String sessionId) {
        this.reply = reply;
        this.sessionId = sessionId;
    }

    // Getters and Setters
    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
