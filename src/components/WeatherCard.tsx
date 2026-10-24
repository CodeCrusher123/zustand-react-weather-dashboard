import type { WeatherResult } from "../store/WeatherStore";

export interface WeatherCardProps {
  result: WeatherResult;
}

export function WeatherCard({ result }: WeatherCardProps) {
  const { city, weather } = result;

  return (
    <>
      <div className="hero-card">
        <div>{city.name}</div>
        <div className="hero-temp">
          {weather.current.temperature_2m}
          {weather.current_units.temperature_2m}
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          Humidity: {weather.current.relative_humidity_2m}
          {weather.current_units.relative_humidity_2m}
        </div>
        <div className="stat-card">
          Wind: {weather.current.wind_speed_10m}
          {weather.current_units.wind_speed_10m}
        </div>
        <div className="stat-card">
          Feels like: {Math.round(weather.current.apparent_temperature)}
          {weather.current_units.apparent_temperature}
        </div>
        <div className="stat-card">
          Pressure: {weather.current.pressure_msl}
          {weather.current_units.pressure_msl}
        </div>
        <div className="stat-card">
          UV Index: {weather.current.uv_index}
          {weather.current_units.uv_index}
        </div>
        <div className="stat-card">
          Sunrise:{" "}
          {new Date(weather.daily.sunrise[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </>
  );
}
