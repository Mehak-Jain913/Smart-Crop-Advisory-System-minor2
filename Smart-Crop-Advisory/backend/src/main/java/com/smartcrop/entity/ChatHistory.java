package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chat_histories", indexes = {
    @Index(name = "idx_chat_session_id", columnList = "session_id", unique = true)
})
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "session_id", nullable = false, unique = true, length = 100)
    private String sessionId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "chat_history_id")
    private List<ChatMessage> messages = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public ChatHistory() {}

    public ChatHistory(Long id, Long userId, String sessionId, List<ChatMessage> messages, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.sessionId = sessionId;
        this.messages = messages != null ? messages : new ArrayList<>();
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ChatHistoryBuilder builder() {
        return new ChatHistoryBuilder();
    }

    public static class ChatHistoryBuilder {
        private Long id;
        private Long userId;
        private String sessionId;
        private List<ChatMessage> messages = new ArrayList<>();
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        ChatHistoryBuilder() {}

        public ChatHistoryBuilder id(Long id) { this.id = id; return this; }
        public ChatHistoryBuilder userId(Long userId) { this.userId = userId; return this; }
        public ChatHistoryBuilder sessionId(String sessionId) { this.sessionId = sessionId; return this; }
        public ChatHistoryBuilder messages(List<ChatMessage> messages) { this.messages = messages; return this; }
        public ChatHistoryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ChatHistoryBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ChatHistory build() {
            return new ChatHistory(id, userId, sessionId, messages, createdAt, updatedAt);
        }
    }
}
