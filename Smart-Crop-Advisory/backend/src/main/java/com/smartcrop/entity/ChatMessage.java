package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String role; // 'user' or 'model'

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public ChatMessage() {}

    public ChatMessage(Long id, String role, String text, LocalDateTime timestamp) {
        this.id = id;
        this.role = role;
        this.text = text;
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static ChatMessageBuilder builder() {
        return new ChatMessageBuilder();
    }

    public static class ChatMessageBuilder {
        private Long id;
        private String role;
        private String text;
        private LocalDateTime timestamp;

        ChatMessageBuilder() {}

        public ChatMessageBuilder id(Long id) { this.id = id; return this; }
        public ChatMessageBuilder role(String role) { this.role = role; return this; }
        public ChatMessageBuilder text(String text) { this.text = text; return this; }
        public ChatMessageBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public ChatMessage build() {
            return new ChatMessage(id, role, text, timestamp);
        }
    }
}
