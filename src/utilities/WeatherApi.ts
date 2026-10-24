export interface WeatherInterface {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    precipitation: number;
    pressure_msl: number;
    uv_index: number;
    weather_code: number;
    is_day: number;
  };
  current_units: {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    wind_gusts_10m: string;
    precipitation: string;
    pressure_msl: string;
    uv_index: string;
    weather_code: string;
    is_day: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset_seconds?: number; // Optional but useful
  timezone_abbreviation?: string; // Optional: "IST", "GMT"
}

export interface GeoCodingResult {
  name: string;
  latitude: number;
  longitude: number;
}

export interface GeoCodingResponse {
  results?: GeoCodingResult[];
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled Case: ${JSON.stringify(value)}`);
}
