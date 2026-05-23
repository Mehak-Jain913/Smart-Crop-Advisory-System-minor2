package com.smartcrop.service;

import com.smartcrop.dto.ChatRequest;
import com.smartcrop.dto.ChatResponse;
import com.smartcrop.entity.ChatHistory;
import com.smartcrop.entity.ChatMessage;
import com.smartcrop.repository.ChatHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @Autowired
    private OllamaService ollamaService;

    private static final String KISAN_SYSTEM_PROMPT = 
        "You are 'Kisan Mitra', an advanced AI-powered agricultural advisor designed specifically for Indian farmers.\n" +
        "\n" +
        "Your goal is to provide intelligent, practical, safe, and easy-to-understand farming guidance using real-time agricultural context.\n" +
        "\n" +
        "You help farmers with:\n" +
        "- Crop recommendations\n" +
        "- Weather interpretation for farming\n" +
        "- Dynamic season analysis\n" +
        "- Disease identification and treatment\n" +
        "- Government schemes and subsidies\n" +
        "- Market prices and selling strategies\n" +
        "- Irrigation and water management\n" +
        "- Fertilizer and pesticide guidance\n" +
        "- Sustainable farming practices\n" +
        "- Soil health management\n" +
        "- Mixed farming recommendations\n" +
        "- Organic farming support\n" +
        "- Accessibility support for rural farmers\n" +
        "\n" +
        "Behavior Rules:\n" +
        "1. Always answer in the SAME language used by the farmer (Hindi, English, or Hinglish mixed).\n" +
        "2. Use simple, farmer-friendly language. Avoid technical jargon unless necessary.\n" +
        "3. Be warm, respectful, practical, and supportive.\n" +
        "4. Keep responses concise but useful (usually 3-6 sentences, use bullet points when needed).\n" +
        "5. Always prioritize farmer safety, sustainable agriculture, water conservation, and eco-friendly practices.\n" +
        "6. Recommending pesticides/fertilizers: mention dosage carefully, safety precautions, warn against overuse, and suggest eco-friendly alternatives.\n" +
        "7. Risky weather: warn the farmer and suggest preventive actions.\n" +
        "8. Redirect unrelated questions politely back to farming.\n" +
        "9. Never generate dangerous or harmful farming advice.\n" +
        "10. Dynamic Agricultural Intelligence: Detect seasons dynamically using weather, adapt recommendations to rainfall/temp, and consider regional Indian practices.\n" +
        "Never mention that you are an AI model unless explicitly asked.";

    public ChatResponse processChat(ChatRequest request) {
        if (request.getMessage() == null || request.getMessage().isBlank()) {
            throw new IllegalArgumentException("Message is required");
        }

        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.isBlank()) {
            // Generate a random session ID if not provided
            sessionId = java.util.UUID.randomUUID().toString();
        }

        // 1. Build conversation history
        String historyContext = "";
        ChatHistory chatHistory = chatHistoryRepository.findBySessionId(sessionId).orElse(null);

        if (chatHistory != null && !chatHistory.getMessages().isEmpty()) {
            List<ChatMessage> messages = chatHistory.getMessages();
            // Take the last 6 messages
            List<ChatMessage> recent = messages.stream()
                    .skip(Math.max(0, messages.size() - 6))
                    .collect(Collectors.toList());

            historyContext = recent.stream()
                    .map(m -> String.format("%s: %s", "user".equalsIgnoreCase(m.getRole()) ? "Farmer" : "Kisan Mitra", m.getText()))
                    .collect(Collectors.joining("\n"));
        }

        // 2. Build full prompt
        String fullPrompt = String.format(
            "%s\n\n%sFarmer: %s\nKisan Mitra:",
            KISAN_SYSTEM_PROMPT,
            !historyContext.isEmpty() ? "Recent conversation:\n" + historyContext + "\n\n" : "",
            request.getMessage()
        );

        // 3. Query Ollama model
        String reply = ollamaService.generate(fullPrompt);

        // 4. Save to Database
        if (chatHistory == null) {
            chatHistory = ChatHistory.builder()
                    .sessionId(sessionId)
                    .userId(request.getUserId())
                    .messages(new ArrayList<>())
                    .build();
        } else {
            if (request.getUserId() != null) {
                chatHistory.setUserId(request.getUserId());
            }
        }

        ChatMessage userMessage = ChatMessage.builder()
                .role("user")
                .text(request.getMessage())
                .timestamp(LocalDateTime.now())
                .build();

        ChatMessage modelMessage = ChatMessage.builder()
                .role("model")
                .text(reply)
                .timestamp(LocalDateTime.now())
                .build();

        chatHistory.getMessages().add(userMessage);
        chatHistory.getMessages().add(modelMessage);

        chatHistoryRepository.save(chatHistory);

        return new ChatResponse(reply, sessionId);
    }
}
