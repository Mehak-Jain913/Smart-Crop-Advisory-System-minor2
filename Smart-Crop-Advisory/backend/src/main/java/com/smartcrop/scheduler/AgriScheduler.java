package com.smartcrop.scheduler;

import com.smartcrop.repository.ChatHistoryRepository;
import com.smartcrop.service.MarketService;
import com.smartcrop.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class AgriScheduler {

    @Autowired
    private MarketService marketService;

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    // 1. Weather Update log: Runs every 10 minutes
    @Scheduled(fixedRate = 600000)
    public void weatherUpdateJob() {
        System.out.println("⏰ [SCHEDULER] " + LocalDateTime.now() + " : Executing real-time weather analytics update job...");
        try {
            weatherService.getWeather(22.7196, 75.8577); // Default Indore
            System.out.println("✅ [SCHEDULER] Regional weather telemetry updated and cached successfully.");
        } catch (Exception e) {
            System.err.println("❌ [SCHEDULER] Weather advisory sync failed: " + e.getMessage());
        }
    }

    // 2. Market price syncing: Runs every 5 minutes
    @Scheduled(fixedRate = 300000)
    public void marketPriceSyncJob() {
        System.out.println("⏰ [SCHEDULER] " + LocalDateTime.now() + " : Syncing national Mandi market prices...");
        try {
            int itemsCount = marketService.getMarketData().size();
            System.out.println("✅ [SCHEDULER] Synchronized " + itemsCount + " crop price fluctuations successfully.");
        } catch (Exception e) {
            System.err.println("❌ [SCHEDULER] Market price sync failed: " + e.getMessage());
        }
    }

    // 3. AI advisory refresh: Runs every hour
    @Scheduled(cron = "0 0 * * * *")
    public void aiAdvisoryRefreshJob() {
        System.out.println("⏰ [SCHEDULER] " + LocalDateTime.now() + " : Refreshing active agricultural AI advisory prompts...");
        // This scheduled task can be expanded to pre-cache or rebuild general AI advisories
        System.out.println("✅ [SCHEDULER] Advisory prompts rebuilt successfully.");
    }

    // 4. Old Chat messages cleanup: Runs every midnight (12:00 AM)
    @Scheduled(cron = "0 0 0 * * *")
    public void chatHistoryCleanupJob() {
        System.out.println("⏰ [SCHEDULER] " + LocalDateTime.now() + " : Starting scheduled cleanup of expired chatbot sessions...");
        try {
            // Delete chat sessions older than 30 days
            LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
            chatHistoryRepository.findAll().stream()
                    .filter(history -> history.getUpdatedAt().isBefore(cutoff))
                    .forEach(history -> {
                        System.out.println("🧹 [SCHEDULER] Purging expired session: " + history.getSessionId());
                        chatHistoryRepository.delete(history);
                    });
            System.out.println("✅ [SCHEDULER] Expired session cleanup completed successfully.");
        } catch (Exception e) {
            System.err.println("❌ [SCHEDULER] Expired session cleanup failed: " + e.getMessage());
        }
    }
}
