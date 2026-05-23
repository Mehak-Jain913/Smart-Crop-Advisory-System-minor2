import { useState, useEffect } from 'react';
import { getMarketPrices } from '../services/api';

export const useMarket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const responseData = await getMarketPrices();
        setData(responseData);
        setError(null);
      } catch (err) {
        console.warn('Market API error, using mock data', err);
        setData([
          { id: 1, crop: 'Wheat', price: '₹2,125 / Qtl', location: 'Punjab', trend: 'up', change: '+2.1%' },
          { id: 2, crop: 'Rice', price: '₹1,940 / Qtl', location: 'Haryana', trend: 'down', change: '-1.3%' },
          { id: 3, crop: 'Cotton', price: '₹6,080 / Qtl', location: 'Gujarat', trend: 'stable', change: '0.0%' },
          { id: 4, crop: 'Sugarcane', price: '₹315 / Qtl', location: 'UP', trend: 'up', change: '+0.8%' },
          { id: 5, crop: 'Maize', price: '₹1,962 / Qtl', location: 'Bihar', trend: 'up', change: '+1.5%' },
        ]);
        setError('Using offline data');
      } finally {
        setLoading(false);
      }
    };
    fetchMarket();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarket, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
