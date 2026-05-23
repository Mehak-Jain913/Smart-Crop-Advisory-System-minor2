package com.smartcrop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DiseaseResponse {
    private String disease;
    private String confidence;
    private String severity;
    private String solution;
    private String pesticide;
    private String prevention;

    @JsonProperty("isHealthy")
    private boolean isHealthy;

    public DiseaseResponse() {}

    public DiseaseResponse(String disease, String confidence, String severity, String solution, String pesticide, String prevention, boolean isHealthy) {
        this.disease = disease;
        this.confidence = confidence;
        this.severity = severity;
        this.solution = solution;
        this.pesticide = pesticide;
        this.prevention = prevention;
        this.isHealthy = isHealthy;
    }

    // Getters and Setters
    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }

    public String getConfidence() { return confidence; }
    public void setConfidence(String confidence) { this.confidence = confidence; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }

    public String getPesticide() { return pesticide; }
    public void setPesticide(String pesticide) { this.pesticide = pesticide; }

    public String getPrevention() { return prevention; }
    public void setPrevention(String prevention) { this.prevention = prevention; }

    @JsonProperty("isHealthy")
    public boolean isHealthy() { return isHealthy; }

    @JsonProperty("isHealthy")
    public void setHealthy(boolean healthy) { isHealthy = healthy; }

    public static DiseaseResponseBuilder builder() {
        return new DiseaseResponseBuilder();
    }

    public static class DiseaseResponseBuilder {
        private String disease;
        private String confidence;
        private String severity;
        private String solution;
        private String pesticide;
        private String prevention;
        private boolean isHealthy;

        DiseaseResponseBuilder() {}

        public DiseaseResponseBuilder disease(String disease) { this.disease = disease; return this; }
        public DiseaseResponseBuilder confidence(String confidence) { this.confidence = confidence; return this; }
        public DiseaseResponseBuilder severity(String severity) { this.severity = severity; return this; }
        public DiseaseResponseBuilder solution(String solution) { this.solution = solution; return this; }
        public DiseaseResponseBuilder pesticide(String pesticide) { this.pesticide = pesticide; return this; }
        public DiseaseResponseBuilder prevention(String prevention) { this.prevention = prevention; return this; }
        public DiseaseResponseBuilder isHealthy(boolean isHealthy) { this.isHealthy = isHealthy; return this; }

        public DiseaseResponse build() {
            return new DiseaseResponse(disease, confidence, severity, solution, pesticide, prevention, isHealthy);
        }
    }
}
