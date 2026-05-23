import { useState, useEffect } from 'react';
import { getWeather } from '../services/api';

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  // Fetch weather when location is available
  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        console.log(
          "Fetching weather for:",
          location.lat,
          location.lng
        );

        const response = await getWeather(
          location.lat,
          location.lng
        );

        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { data, loading, error };
};