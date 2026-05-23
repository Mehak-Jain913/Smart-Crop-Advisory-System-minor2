package com.smartcrop.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartcrop.dto.RecommendRequest;
import com.smartcrop.dto.RecommendResponse;
import com.smartcrop.entity.Recommendation;
import com.smartcrop.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RecommendationService {

    @Autowired
    private OllamaService ollamaService;

    @Autowired
    private RecommendationRepository recommendationRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public RecommendResponse getRecommendation(RecommendRequest request) {
        if (request.getLocation() == null || request.getSoilType() == null ||
            request.getLandArea() == null || request.getSeason() == null) {
            throw new IllegalArgumentException("location, soilType, landArea, and season are required");
        }

        String prompt = String.format(
            "You are an expert Indian agricultural advisor. A farmer has the following farm details:\n" +
            "- Location: %s\n" +
            "- Soil Type: %s\n" +
            "- Land Area: %.1f acres\n" +
            "- Season: %s\n\n" +
            "Based on these details, provide a JSON recommendation (only return raw JSON, no markdown, no comments, no explanation):\n" +
            "{\n" +
            "  \"crop\": \"Best crop name\",\n" +
            "  \"yield\": \"Expected yield like '4,200 Kg'\",\n" +
            "  \"profit\": \"Expected profit like '₹88,000'\",\n" +
            "  \"reason\": \"2-3 sentence explanation\",\n" +
            "  \"mixFarming\": {\n" +
            "    \"suggestion\": \"Crop A + Crop B\",\n" +
            "    \"benefit\": \"Main benefit\",\n" +
            "    \"profitIncrease\": \"₹18,000 Extra\"\n" +
            "  },\n" +
            "  \"tips\": [\"Tip 1\", \"Tip 2\", \"Tip 3\"]\n" +
            "}",
            request.getLocation(), request.getSoilType(), request.getLandArea(), request.getSeason()
        );

        String rawAI = ollamaService.generate(prompt);
        RecommendResponse result = null;

        try {
            // Find the JSON block
            Pattern pattern = Pattern.compile("\\{[\\s\\S]*\\}");
            Matcher matcher = pattern.matcher(rawAI);
            if (matcher.find()) {
                String cleanJson = matcher.group(0);
                result = objectMapper.readValue(cleanJson, RecommendResponse.class);
            } else {
                throw new RuntimeException("Could not extract JSON block from AI output");
            }
        } catch (Exception e) {
            System.err.println("JSON parsing failed, loading safe recommendation fallback: " + e.getMessage());
            // Fallback object matching the Node.js backup logic
            result = new RecommendResponse();
            result.setCrop("Wheat");
            result.setYield("4,200 Kg");
            result.setProfit("₹88,000");
            result.setReason("Wheat is ideal for " + request.getSoilType() + " soil during the " + request.getSeason() + " season in " + request.getLocation() + ".");
            
            RecommendResponse.MixFarming mix = new RecommendResponse.MixFarming();
            mix.setSuggestion("Wheat + Mustard");
            mix.setBenefit("Higher Profit & Natural Pest Repulsion");
            mix.setProfitIncrease("₹18,000 Extra");
            result.setMixFarming(mix);

            List<String> tips = new ArrayList<>();
            tips.add("Use high-vigor certified seeds");
            tips.add("Apply crown root initiation watering schedules (21-25 days after sowing)");
            tips.add("Distribute balanced NPK/DAP compounds during primary sowing");
            result.setTips(tips);
        }

        // Map and save to MySQL database
        Recommendation rec = Recommendation.builder()
                .userId(request.getUserId())
                .location(request.getLocation())
                .soilType(request.getSoilType())
                .landArea(request.getLandArea())
                .season(request.getSeason())
                .crop(result.getCrop())
                .expectedYield(result.getYield())
                .profit(result.getProfit())
                .reason(result.getReason())
                .mixFarmingSuggestion(result.getMixFarming() != null ? result.getMixFarming().getSuggestion() : null)
                .mixFarmingBenefit(result.getMixFarming() != null ? result.getMixFarming().getBenefit() : null)
                .mixFarmingProfitIncrease(result.getMixFarming() != null ? result.getMixFarming().getProfitIncrease() : null)
                .tips(result.getTips() != null ? result.getTips() : new ArrayList<>())
                .rawAI(rawAI)
                .build();

        Recommendation savedRec = recommendationRepository.save(rec);
        result.setId(savedRec.getId());

        return result;
    }
}
