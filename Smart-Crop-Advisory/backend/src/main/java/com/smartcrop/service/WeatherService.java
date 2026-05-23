package com.smartcrop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartcrop.dto.WeatherResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    // WMO Weather code mapper
    private static final Map<Integer, String> WMO_CODES = new HashMap<>();
    static {
        WMO_CODES.put(0, "Clear");
        WMO_CODES.put(1, "Mainly Clear");
        WMO_CODES.put(2, "Partly Cloudy");
        WMO_CODES.put(3, "Overcast");
        WMO_CODES.put(45, "Foggy");
        WMO_CODES.put(48, "Icy Fog");
        WMO_CODES.put(51, "Light Drizzle");
        WMO_CODES.put(53, "Drizzle");
        WMO_CODES.put(55, "Heavy Drizzle");
        WMO_CODES.put(61, "Light Rain");
        WMO_CODES.put(63, "Rain");
        WMO_CODES.put(65, "Heavy Rain");
        WMO_CODES.put(71, "Light Snow");
        WMO_CODES.put(73, "Snow");
        WMO_CODES.put(75, "Heavy Snow");
        WMO_CODES.put(80, "Light Showers");
        WMO_CODES.put(81, "Showers");
        WMO_CODES.put(82, "Heavy Showers");
        WMO_CODES.put(95, "Thunderstorm");
        WMO_CODES.put(96, "Thunderstorm w/ Hail");
        WMO_CODES.put(99, "Heavy Thunderstorm");
    }

    public WeatherService() {
        this.webClient = WebClient.builder().build();
        this.objectMapper = new ObjectMapper();
    }

    public WeatherResponse getWeather(Double lat, Double lon) {
        // Handle defaults if null
        double latitude = (lat != null) ? lat : 22.7196; // Indore default
        double longitude = (lon != null) ? lon : 75.8577;

        try {
            String url = String.format(
                "https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f" +
                "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,windspeed_10m" +
                "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode" +
                "&forecast_days=7&timezone=Asia/Kolkata",
                latitude, longitude
            );

            String jsonString = webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(jsonString);
            JsonNode hourly = root.path("hourly");
            JsonNode daily = root.path("daily");

            // Extract hourly data points
            JsonNode hourlyTimes = hourly.path("time");
            JsonNode hourlyTemps = hourly.path("temperature_2m");
            JsonNode hourlyHumidities = hourly.path("relative_humidity_2m");
            JsonNode hourlyRainChances = hourly.path("precipitation_probability");
            JsonNode hourlyRains = hourly.path("rain");
            JsonNode hourlyWinds = hourly.path("windspeed_10m");

            List<WeatherResponse.HourlyWeather> hourlyList = new ArrayList<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy, hh:mm:ss a");

            for (int i = 0; i < Math.min(24, hourlyTimes.size()); i++) {
                String timeStr = hourlyTimes.get(i).asText(); // format like 2026-05-23T00:00
                LocalDateTime time = LocalDateTime.parse(timeStr);
                String formattedTime = time.format(formatter);

                hourlyList.add(WeatherResponse.HourlyWeather.builder()
                        .time(formattedTime)
                        .temperature(Math.round(hourlyTemps.get(i).asDouble() * 10.0) / 10.0)
                        .humidity(hourlyHumidities.get(i).asInt())
                        .rainChance(hourlyRainChances.get(i).asInt())
                        .rain(Math.round(hourlyRains.get(i).asDouble() * 10.0) / 10.0)
                        .windSpeed(Math.round(hourlyWinds.get(i).asDouble() * 10.0) / 10.0)
                        .build());
            }

            // Extract daily data points
            JsonNode dailyTimes = daily.path("time");
            JsonNode dailyMaxTemps = daily.path("temperature_2m_max");
            JsonNode dailyMinTemps = daily.path("temperature_2m_min");
            JsonNode dailyRainChances = daily.path("precipitation_probability_max");
            JsonNode dailyCodes = daily.path("weathercode");

            List<WeatherResponse.DailyWeather> dailyList = new ArrayList<>();
            for (int i = 0; i < dailyTimes.size(); i++) {
                String dateStr = dailyTimes.get(i).asText(); // e.g. "2026-05-23"
                String condition = WMO_CODES.getOrDefault(dailyCodes.get(i).asInt(), "Clear");

                dailyList.add(WeatherResponse.DailyWeather.builder()
                        .date(dateStr)
                        .maxTemp((int) Math.round(dailyMaxTemps.get(i).asDouble()))
                        .minTemp((int) Math.round(dailyMinTemps.get(i).asDouble()))
                        .rainChance(dailyRainChances.get(i).asInt())
                        .condition(condition)
                        .build());
            }

            WeatherResponse.HourlyWeather currentHour = hourlyList.isEmpty() ? null : hourlyList.get(0);
            WeatherResponse.CurrentWeather current = WeatherResponse.CurrentWeather.builder()
                    .temperature(currentHour != null ? currentHour.getTemperature() + "°C" : "28°C")
                    .humidity(currentHour != null ? currentHour.getHumidity() + "%" : "65%")
                    .rainfall(currentHour != null ? currentHour.getRainChance() + "% chance" : "20% chance")
                    .windSpeed(currentHour != null ? currentHour.getWindSpeed() + " km/h" : "14 km/h")
                    .condition(!dailyList.isEmpty() ? dailyList.get(0).getCondition() : "Clear")
                    .build();

            return WeatherResponse.builder()
                    .current(current)
                    .hourly(hourlyList)
                    .daily(dailyList)
                    .location(new WeatherResponse.LocationCoordinates(latitude, longitude))
                    .build();

        } catch (Exception e) {
            System.err.println("OpenMeteo api failed, triggering mock weather fallback: " + e.getMessage());
            return getFallbackWeather(latitude, longitude);
        }
    }

    private WeatherResponse getFallbackWeather(double lat, double lon) {
        List<WeatherResponse.DailyWeather> dailyList = new ArrayList<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDateTime now = LocalDateTime.now();

        for (int i = 0; i < 7; i++) {
            dailyList.add(WeatherResponse.DailyWeather.builder()
                    .date(now.plusDays(i).format(dateFormatter))
                    .maxTemp(32 - i)
                    .minTemp(22 - i)
                    .rainChance(20 + i * 5)
                    .condition("Partly Cloudy")
                    .build());
        }

        List<WeatherResponse.HourlyWeather> hourlyList = new ArrayList<>();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy, hh:mm:ss a");
        for (int i = 0; i < 24; i++) {
            hourlyList.add(WeatherResponse.HourlyWeather.builder()
                    .time(now.plusHours(i).format(timeFormatter))
                    .temperature(28.0 - (i % 6) * 0.5)
                    .humidity(65 + (i % 4) * 2)
                    .rainChance(20 + i)
                    .rain(0.0)
                    .windSpeed(14.0 + (i % 3) * 0.5)
                    .build());
        }

        WeatherResponse.CurrentWeather current = WeatherResponse.CurrentWeather.builder()
                .temperature("28°C")
                .humidity("65%")
                .rainfall("20% chance")
                .windSpeed("14 km/h")
                .condition("Partly Cloudy")
                .build();

        return WeatherResponse.builder()
                .current(current)
                .hourly(hourlyList)
                .daily(dailyList)
                .location(new WeatherResponse.LocationCoordinates(lat, lon))
                .build();
    }
}
