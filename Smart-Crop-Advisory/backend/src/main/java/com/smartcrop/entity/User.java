package com.smartcrop.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_email", columnList = "email", unique = true)
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 20)
    private String role = "farmer";

    @Column(length = 255)
    private String location = "Indore, Madhya Pradesh";

    @Column(name = "land_area")
    private Double landArea = 5.0;

    @Column(name = "soil_type", length = 50)
    private String soilType = "alluvial";

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_preferred_crops", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "crop_name")
    private List<String> preferredCrops = new ArrayList<>();

    @Column(name = "profile_pic", columnDefinition = "TEXT")
    private String profilePic;

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

    // Default Constructor
    public User() {}

    // All-Args Constructor
    public User(Long id, String name, String email, String password, String role, String location, Double landArea, String soilType, List<String> preferredCrops, String profilePic, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role != null ? role : "farmer";
        this.location = location != null ? location : "Indore, Madhya Pradesh";
        this.landArea = landArea != null ? landArea : 5.0;
        this.soilType = soilType != null ? soilType : "alluvial";
        this.preferredCrops = preferredCrops != null ? preferredCrops : new ArrayList<>();
        this.profilePic = profilePic;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getLandArea() { return landArea; }
    public void setLandArea(Double landArea) { this.landArea = landArea; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public List<String> getPreferredCrops() { return preferredCrops; }
    public void setPreferredCrops(List<String> preferredCrops) { this.preferredCrops = preferredCrops; }

    public String getProfilePic() { return profilePic; }
    public void setProfilePic(String profilePic) { this.profilePic = profilePic; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder Pattern
    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String name;
        private String email;
        private String password;
        private String role = "farmer";
        private String location = "Indore, Madhya Pradesh";
        private Double landArea = 5.0;
        private String soilType = "alluvial";
        private List<String> preferredCrops = new ArrayList<>();
        private String profilePic;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        UserBuilder() {}

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder name(String name) { this.name = name; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder location(String location) { this.location = location; return this; }
        public UserBuilder landArea(Double landArea) { this.landArea = landArea; return this; }
        public UserBuilder soilType(String soilType) { this.soilType = soilType; return this; }
        public UserBuilder preferredCrops(List<String> preferredCrops) { this.preferredCrops = preferredCrops; return this; }
        public UserBuilder profilePic(String profilePic) { this.profilePic = profilePic; return this; }
        public UserBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public User build() {
            return new User(id, name, email, password, role, location, landArea, soilType, preferredCrops, profilePic, createdAt, updatedAt);
        }
    }
}
