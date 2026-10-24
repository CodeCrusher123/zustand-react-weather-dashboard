export const cityUrl = new URL(
  "https://geocoding-api.open-meteo.com/v1/search",
);
cityUrl.searchParams.set("count", "1");
cityUrl.searchParams.set("language", "en");
cityUrl.searchParams.set("format", "json");

export const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
weatherUrl.searchParams.set(
  "current",
  "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,precipitation,pressure_msl,uv_index,weather_code,is_day",
);
weatherUrl.searchParams.set(
  "hourly",
  "temperature_2m,precipitation_probability",
);
weatherUrl.searchParams.set(
  "daily",
  "temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
);
weatherUrl.searchParams.set("timezone", "auto");
