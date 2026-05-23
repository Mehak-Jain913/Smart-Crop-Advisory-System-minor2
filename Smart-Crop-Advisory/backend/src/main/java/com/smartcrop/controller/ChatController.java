package com.smartcrop.controller;

import com.smartcrop.dto.ChatRequest;
import com.smartcrop.dto.ChatResponse;
import com.smartcrop.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/chatbot")
    public ResponseEntity<ChatResponse> processChat(@RequestBody ChatRequest request) {
        ChatResponse response = chatService.processChat(request);
        return ResponseEntity.ok(response);
    }
}
