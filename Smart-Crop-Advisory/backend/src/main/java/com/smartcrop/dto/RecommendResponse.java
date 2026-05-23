package com.smartcrop.dto;

import java.util.List;

public class RecommendResponse {
    private Long id;
    private String crop;
    private String yield;
    private String profit;
    private String reason;
    private MixFarming mixFarming;
    private List<String> tips;

    public RecommendResponse() {}

    public RecommendResponse(Long id, String crop, String yield, String profit, String reason, MixFarming mixFarming, List<String> tips) {
        this.id = id;
        this.crop = crop;
        this.yield = yield;
        this.profit = profit;
        this.reason = reason;
        this.mixFarming = mixFarming;
        this.tips = tips;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public String getYield() { return yield; }
    public void setYield(String yield) { this.yield = yield; }

    public String getProfit() { return profit; }
    public void setProfit(String profit) { this.profit = profit; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public MixFarming getMixFarming() { return mixFarming; }
    public void setMixFarming(MixFarming mixFarming) { this.mixFarming = mixFarming; }

    public List<String> getTips() { return tips; }
    public void setTips(List<String> tips) { this.tips = tips; }

    public static class MixFarming {
        private String suggestion;
        private String benefit;
        private String profitIncrease;

        public MixFarming() {}

        public MixFarming(String suggestion, String benefit, String profitIncrease) {
            this.suggestion = suggestion;
            this.benefit = benefit;
            this.profitIncrease = profitIncrease;
        }

        public String getSuggestion() { return suggestion; }
        public void setSuggestion(String suggestion) { this.suggestion = suggestion; }

        public String getBenefit() { return benefit; }
        public void setBenefit(String benefit) { this.benefit = benefit; }

        public String getProfitIncrease() { return profitIncrease; }
        public void setProfitIncrease(String profitIncrease) { this.profitIncrease = profitIncrease; }
    }
}
