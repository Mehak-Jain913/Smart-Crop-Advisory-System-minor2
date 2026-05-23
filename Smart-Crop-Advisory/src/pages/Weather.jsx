import { useWeather } from '../hooks/useWeather';
import { motion } from 'framer-motion';
import { ThermometerSun, Droplet, CloudRain, Wind, Sun, Cloud, CloudSnow, Zap } from 'lucide-react';

const conditionIcon = (cond = '') => {
  const c = cond.toLowerCase();
  if (c.includes('thunder') || c.includes('storm')) return <Zap className="text-yellow-500" size={24} />;
  if (c.includes('rain') || c.includes('shower') || c.includes('drizzle')) return <CloudRain className="text-blue-500" size={24} />;
  if (c.includes('snow')) return <CloudSnow className="text-blue-200" size={24} />;
  if (c.includes('cloud') || c.includes('overcast') || c.includes('fog')) return <Cloud className="text-gray-400" size={24} />;
  return <Sun className="text-amber-400" size={24} />;
};

export const Weather = () => {
  const { data, loading, error } = useWeather();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Fetching real-time weather data...</p>
      </div>
    </div>
  );

  const current = data?.current || {};
  const daily = data?.daily || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Advisory</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {/* Real-time local conditions powered by Open-Meteo API. */}
          {error && <span className="text-amber-500 ml-2 text-xs">(Offline fallback)</span>}
        </p>
      </div>

      {/* Current conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WeatherCard title="Temperature" value={current.temperature} icon={<ThermometerSun className="text-orange-500" size={32} />} />
        <WeatherCard title="Humidity" value={current.humidity} icon={<Droplet className="text-cyan-500" size={32} />} />
        <WeatherCard title="Rain Chance" value={current.rainfall} icon={<CloudRain className="text-blue-500" size={32} />} />
        <WeatherCard title="Wind Speed" value={current.windSpeed} icon={<Wind className="text-gray-400" size={32} />} />
      </div>

      {/* Current condition pill */}
      {current.condition && (
        <div className="flex items-center space-x-3 bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 rounded-xl px-5 py-3 w-fit">
          {conditionIcon(current.condition)}
          <span className="font-semibold text-gray-800 dark:text-white">{current.condition}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Current Condition</span>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">7-Day Forecast</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4 min-w-max">
            {daily.map((day, i) => (
              <div key={i} className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-36 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  {i === 0 ? 'Today' : new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <div className="mb-2">{conditionIcon(day.condition)}</div>
                <span className="font-bold text-gray-900 dark:text-white">{day.maxTemp}°C</span>
                <span className="text-xs text-gray-400 mt-0.5">{day.minTemp}°C</span>
                <div className="flex items-center space-x-1 mt-2">
                  <CloudRain size={12} className="text-blue-400" />
                  <span className="text-xs text-blue-500 font-medium">{day.rainChance}%</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 text-center truncate w-full">{day.condition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop advisory based on weather */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-900 border border-green-200 dark:border-gray-800 rounded-xl p-6 shadow-md">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">🌾 Crop Advisory Based on Weather</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Irrigation', tip: current.rainfall?.includes('0%') ? 'Irrigate today — no rain expected' : 'Hold irrigation — rain likely', color: 'text-blue-600' },
            { title: 'Spraying', tip: `Wind at ${current.windSpeed || '--'}. ${parseFloat(current.windSpeed) > 20 ? 'Avoid spraying — too windy' : 'Good conditions for spraying'}`, color: 'text-green-600' },
            { title: 'Harvest', tip: `${current.humidity || '--'} humidity. ${parseFloat(current.humidity) > 80 ? 'High humidity — delay harvest if possible' : 'Good conditions to harvest'}`, color: 'text-amber-600' },
          ].map((a, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className={`text-sm font-bold ${a.color} mb-1`}>{a.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{a.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WeatherCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 group hover:shadow-lg transition-all">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h4>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value || '--'}</p>
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
    </div>
  </div>
);
