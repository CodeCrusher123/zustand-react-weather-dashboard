import { useWeatherStore } from "../store/WeatherStore";
import { useRef } from "react";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useWeatherStore((s) => s.query);
  const fetchWeather = useWeatherStore((s) => s.fetchWeather);
  const setQuery = useWeatherStore((s) => s.setQuery);
  const status = useWeatherStore((s) => s.status);
  const resetAll = useWeatherStore((s) => s.resetAll);
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for city..."
        aria-label="Search for city"
      />
      <button
        type="submit"
        disabled={status.state === "loading" || !query.trim()}
        className="search-btn"
      >
        <span className={status.state === "loading" ? "hidden" : ""}>
          {status.state === "loading" ? "" : "Search"}
        </span>
        {status.state === "loading" && <span className="btn-loader"></span>}
      </button>
      {status.state !== "idle" ? (
        <button
          type="button"
          onClick={() => {
            resetAll();
            inputRef.current?.focus();
          }}
          className="reset-btn"
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </form>
  );
}
