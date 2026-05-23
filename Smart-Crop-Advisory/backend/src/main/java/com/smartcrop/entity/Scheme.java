package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "schemes", indexes = {
    @Index(name = "idx_scheme_url", columnList = "url", unique = true)
})
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 500)
    private String url;

    @Column(length = 100)
    private String source;

    @Column(columnDefinition = "TEXT")
    private String card;

    @Column(name = "scraped_at", nullable = false)
    private LocalDateTime scrapedAt = LocalDateTime.now();

    public Scheme() {}

    public Scheme(Long id, String title, String url, String source, String card, LocalDateTime scrapedAt) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.source = source;
        this.card = card;
        this.scrapedAt = scrapedAt != null ? scrapedAt : LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getCard() { return card; }
    public void setCard(String card) { this.card = card; }

    public LocalDateTime getScrapedAt() { return scrapedAt; }
    public void setScrapedAt(LocalDateTime scrapedAt) { this.scrapedAt = scrapedAt; }

    public static SchemeBuilder builder() {
        return new SchemeBuilder();
    }

    public static class SchemeBuilder {
        private Long id;
        private String title;
        private String url;
        private String source;
        private String card;
        private LocalDateTime scrapedAt;

        SchemeBuilder() {}

        public SchemeBuilder id(Long id) { this.id = id; return this; }
        public SchemeBuilder title(String title) { this.title = title; return this; }
        public SchemeBuilder url(String url) { this.url = url; return this; }
        public SchemeBuilder source(String source) { this.source = source; return this; } // Wait! double return statement by mistake? No, let's fix it below.
        public SchemeBuilder card(String card) { this.card = card; return this; }
        public SchemeBuilder scrapedAt(LocalDateTime scrapedAt) { this.scrapedAt = scrapedAt; return this; }

        public Scheme build() {
            return new Scheme(id, title, url, source, card, scrapedAt);
        }
    }
}
