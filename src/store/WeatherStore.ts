import { create } from "zustand";
import type {
  WeatherInterface,
  GeoCodingResult,
  GeoCodingResponse,
} from "../utilities/WeatherApi";
import { cityUrl, weatherUrl } from "../utilities/UrlMaker";

export type WeatherResult = {
  city: GeoCodingResult;
  weather: WeatherInterface;
};

export type RequestStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; result: WeatherResult }
  | { state: "error"; message: string };

export interface WeatherStore {
  status: RequestStatus;
  query: string;
  setQuery: (query: string) => void;
  fetchWeather: () => Promise<void>;
  resetAll: () => void;
}

let currentController: AbortController | null = null;

export const useWeatherStore = create<WeatherStore>()((set, get) => ({
  status: { state: "idle" },
  query: "",
  setQuery: (query) =>
    set({
      query: query,
    }),
  fetchWeather: async () => {
    if (!get().query || get().query.length < 3) return;

    currentController?.abort();
    const controller = new AbortController();
    currentController = controller;
    const signal = AbortSignal.any([
      controller.signal,
      AbortSignal.timeout(5000),
    ]);
    set({ status: { state: "loading" } });

    try {
      // 1. Taking Search Value from Query field
      const cityName = get().query.trim().toLowerCase();

      // 2. Clonning cityUrl to prevent mutation and adding SearchParams
      const cityUrlFinal = new URL(cityUrl);
      cityUrlFinal.searchParams.set("name", cityName);

      // 3. Start City name fetch
      const cityRes = await fetch(cityUrlFinal, { signal: signal });
      if (!cityRes.ok) throw new Error("City fetch failed");
      const cityData: GeoCodingResponse = await cityRes.json();
      if (!cityData.results || cityData.results?.length === 0)
        throw new Error("City not found");

      const lat = cityData.results[0].latitude;
      const long = cityData.results[0].longitude;
      if (lat == null || long == null) throw new Error("Invalid Coordinates");

      const weatherUrlFinal = new URL(weatherUrl);
      weatherUrlFinal.searchParams.set("latitude", String(lat));
      weatherUrlFinal.searchParams.set("longitude", String(long));

      const geoResults: GeoCodingResult = {
        name: cityData.results[0].name,
        latitude: cityData.results[0].latitude,
        longitude: cityData.results[0].longitude,
      };

      // 4. Start Weather fetch
      const weatherRes = await fetch(weatherUrlFinal, {
        signal: signal,
      });
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherData: WeatherInterface = await weatherRes.json();

      const finalWeather: WeatherResult = {
        city: geoResults,
        weather: weatherData,
      };

      set({ status: { state: "success", result: finalWeather } });
    } catch (err) {
      if (currentController !== controller) return;
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          set({
            status: { state: "error", message: "Request replaced or reset!" },
          });
        } else if (err.name === "TimeoutError") {
          set({ status: { state: "error", message: "Request timed out!" } });
        } else {
          set({ status: { state: "error", message: err.message } });
        }
      } else {
        set({
          status: { state: "error", message: "An unexpected error occurred" },
        });
      }
    } finally {
      if (currentController === controller) {
        currentController = null;
      }
    }
  },
  resetAll: () => {
    set({
      status: { state: "idle" },
      query: "",
    });
    currentController?.abort();
    currentController = null;
  },
}));
