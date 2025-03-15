import React, { useState, useEffect } from 'react';
import { Search, Thermometer, Droplets, Wind, Gauge } from 'lucide-react';
import type { WeatherData } from './types';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=0e9aba14372e8841c7b15470a8830f85`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} />}

        {weatherData && !loading && !error && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">{weatherData.name}</h1>
              <p className="text-6xl font-bold text-white">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-xl text-white/80 capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <WeatherCard
                title="Feels Like"
                value={`${Math.round(weatherData.main.feels_like)}°C`}
                icon={<Thermometer className="w-5 h-5" />}
              />
              <WeatherCard
                title="Humidity"
                value={`${weatherData.main.humidity}%`}
                icon={<Droplets className="w-5 h-5" />}
              />
              <WeatherCard
                title="Wind Speed"
                value={`${weatherData.wind.speed} m/s`}
                icon={<Wind className="w-5 h-5" />}
              />
              <WeatherCard
                title="Pressure"
                value={`${weatherData.main.pressure} hPa`}
                icon={<Gauge className="w-5 h-5" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
