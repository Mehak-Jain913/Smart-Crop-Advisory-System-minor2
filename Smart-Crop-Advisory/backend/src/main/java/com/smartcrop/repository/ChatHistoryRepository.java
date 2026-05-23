package com.smartcrop.repository;

import com.smartcrop.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    Optional<ChatHistory> findBySessionId(String sessionId);
}
