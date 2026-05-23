package com.smartcrop.dto;

import java.util.List;

public class WeatherResponse {
    private CurrentWeather current;
    private List<HourlyWeather> hourly;
    private List<DailyWeather> daily;
    private LocationCoordinates location;

    public WeatherResponse() {}

    public WeatherResponse(CurrentWeather current, List<HourlyWeather> hourly, List<DailyWeather> daily, LocationCoordinates location) {
        this.current = current;
        this.hourly = hourly;
        this.daily = daily;
        this.location = location;
    }

    // Getters and Setters
    public CurrentWeather getCurrent() { return current; }
    public void setCurrent(CurrentWeather current) { this.current = current; }

    public List<HourlyWeather> getHourly() { return hourly; }
    public void setHourly(List<HourlyWeather> hourly) { this.hourly = hourly; }

    public List<DailyWeather> getDaily() { return daily; }
    public void setDaily(List<DailyWeather> daily) { this.daily = daily; }

    public LocationCoordinates getLocation() { return location; }
    public void setLocation(LocationCoordinates location) { this.location = location; }

    public static WeatherResponseBuilder builder() {
        return new WeatherResponseBuilder();
    }

    public static class WeatherResponseBuilder {
        private CurrentWeather current;
        private List<HourlyWeather> hourly;
        private List<DailyWeather> daily;
        private LocationCoordinates location;

        WeatherResponseBuilder() {}

        public WeatherResponseBuilder current(CurrentWeather current) { this.current = current; return this; }
        public WeatherResponseBuilder hourly(List<HourlyWeather> hourly) { this.hourly = hourly; return this; }
        public WeatherResponseBuilder daily(List<DailyWeather> daily) { this.daily = daily; return this; }
        public WeatherResponseBuilder location(LocationCoordinates location) { this.location = location; return this; }

        public WeatherResponse build() {
            return new WeatherResponse(current, hourly, daily, location);
        }
    }

    // Static nested classes
    public static class CurrentWeather {
        private String temperature;
        private String humidity;
        private String rainfall;
        private String windSpeed;
        private String condition;

        public CurrentWeather() {}
        public CurrentWeather(String temperature, String humidity, String rainfall, String windSpeed, String condition) {
            this.temperature = temperature;
            this.humidity = humidity;
            this.rainfall = rainfall;
            this.windSpeed = windSpeed;
            this.condition = condition;
        }

        public String getTemperature() { return temperature; }
        public void setTemperature(String temperature) { this.temperature = temperature; }
        public String getHumidity() { return humidity; }
        public void setHumidity(String humidity) { this.humidity = humidity; }
        public String getRainfall() { return rainfall; }
        public void setRainfall(String rainfall) { this.rainfall = rainfall; }
        public String getWindSpeed() { return windSpeed; }
        public void setWindSpeed(String windSpeed) { this.windSpeed = windSpeed; }
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }

        public static CurrentWeatherBuilder builder() { return new CurrentWeatherBuilder(); }

        public static class CurrentWeatherBuilder {
            private String temperature;
            private String humidity;
            private String rainfall;
            private String windSpeed;
            private String condition;
            public CurrentWeatherBuilder temperature(String temperature) { this.temperature = temperature; return this; }
            public CurrentWeatherBuilder humidity(String humidity) { this.humidity = humidity; return this; }
            public CurrentWeatherBuilder rainfall(String rainfall) { this.rainfall = rainfall; return this; }
            public CurrentWeatherBuilder windSpeed(String windSpeed) { this.windSpeed = windSpeed; return this; }
            public CurrentWeatherBuilder condition(String condition) { this.condition = condition; return this; }
            public CurrentWeather build() { return new CurrentWeather(temperature, humidity, rainfall, windSpeed, condition); }
        }
    }

    public static class HourlyWeather {
        private String time;
        private Double temperature;
        private Integer humidity;
        private Integer rainChance;
        private Double rain;
        private Double windSpeed;

        public HourlyWeather() {}
        public HourlyWeather(String time, Double temperature, Integer humidity, Integer rainChance, Double rain, Double windSpeed) {
            this.time = time;
            this.temperature = temperature;
            this.humidity = humidity;
            this.rainChance = rainChance;
            this.rain = rain;
            this.windSpeed = windSpeed;
        }

        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
        public Double getTemperature() { return temperature; }
        public void setTemperature(Double temperature) { this.temperature = temperature; }
        public Integer getHumidity() { return humidity; }
        public void setHumidity(Integer humidity) { this.humidity = humidity; }
        public Integer getRainChance() { return rainChance; }
        public void setRainChance(Integer rainChance) { this.rainChance = rainChance; }
        public Double getRain() { return rain; }
        public void setRain(Double rain) { this.rain = rain; }
        public Double getWindSpeed() { return windSpeed; }
        public void setWindSpeed(Double windSpeed) { this.windSpeed = windSpeed; }

        public static HourlyWeatherBuilder builder() { return new HourlyWeatherBuilder(); }

        public static class HourlyWeatherBuilder {
            private String time;
            private Double temperature;
            private Integer humidity;
            private Integer rainChance;
            private Double rain;
            private Double windSpeed;
            public HourlyWeatherBuilder time(String time) { this.time = time; return this; }
            public HourlyWeatherBuilder temperature(Double temperature) { this.temperature = temperature; return this; }
            public HourlyWeatherBuilder humidity(Integer humidity) { this.humidity = humidity; return this; }
            public HourlyWeatherBuilder rainChance(Integer rainChance) { this.rainChance = rainChance; return this; }
            public HourlyWeatherBuilder rain(Double rain) { this.rain = rain; return this; }
            public HourlyWeatherBuilder windSpeed(Double windSpeed) { this.windSpeed = windSpeed; return this; }
            public HourlyWeather build() { return new HourlyWeather(time, temperature, humidity, rainChance, rain, windSpeed); }
        }
    }

    public static class DailyWeather {
        private String date;
        private Integer maxTemp;
        private Integer minTemp;
        private Integer rainChance;
        private String condition;

        public DailyWeather() {}
        public DailyWeather(String date, Integer maxTemp, Integer minTemp, Integer rainChance, String condition) {
            this.date = date;
            this.maxTemp = maxTemp;
            this.minTemp = minTemp;
            this.rainChance = rainChance;
            this.condition = condition;
        }

        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public Integer getMaxTemp() { return maxTemp; }
        public void setMaxTemp(Integer maxTemp) { this.maxTemp = maxTemp; }
        public Integer getMinTemp() { return minTemp; }
        public void setMinTemp(Integer minTemp) { this.minTemp = minTemp; }
        public Integer getRainChance() { return rainChance; }
        public void setRainChance(Integer rainChance) { this.rainChance = rainChance; }
        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }

        public static DailyWeatherBuilder builder() { return new DailyWeatherBuilder(); }

        public static class DailyWeatherBuilder {
            private String date;
            private Integer maxTemp;
            private Integer minTemp;
            private Integer rainChance;
            private String condition;
            public DailyWeatherBuilder date(String date) { this.date = date; return this; }
            public DailyWeatherBuilder maxTemp(Integer maxTemp) { this.maxTemp = maxTemp; return this; }
            public DailyWeatherBuilder minTemp(Integer minTemp) { this.minTemp = minTemp; return this; }
            public DailyWeatherBuilder rainChance(Integer rainChance) { this.rainChance = rainChance; return this; }
            public DailyWeatherBuilder condition(String condition) { this.condition = condition; return this; }
            public DailyWeather build() { return new DailyWeather(date, maxTemp, minTemp, rainChance, condition); }
        }
    }

    public static class LocationCoordinates {
        private Double lat;
        private Double lon;

        public LocationCoordinates() {}
        public LocationCoordinates(Double lat, Double lon) {
            this.lat = lat;
            this.lon = lon;
        }

        public Double getLat() { return lat; }
        public void setLat(Double lat) { this.lat = lat; }
        public Double getLon() { return lon; }
        public void setLon(Double lon) { this.lon = lon; }
    }
}
