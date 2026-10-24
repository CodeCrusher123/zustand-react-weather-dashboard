import { useWeatherStore } from "../store/WeatherStore";
import { SearchBar } from "./SearchBar";
import { WeatherCard } from "./WeatherCard";
import { WelcomeCard } from "./WelcomeCard";
import { LoadingCard } from "./LoadingCard";
import { FooterCard } from "./FooterCard";
import { HourlyChart } from "../charts/HourlyChart";
import { DailyChart } from "../charts/DailyChart";
import { UVIndexChart } from "../charts/UVIndexChart";
import type { RequestStatus } from "../store/WeatherStore";
import { assertNever } from "../utilities/WeatherApi";

export function StatusContent({ status }: { status: RequestStatus }) {
  const setQuery = useWeatherStore((s) => s.setQuery);
  switch (status.state) {
    case "idle":
      return (
        <WelcomeCard
          onSelectCity={(cityName) => {
            setQuery(cityName);
          }}
        />
      );
    case "loading":
      return <LoadingCard />;
    case "error":
      return <p role="alert">{status.message}</p>;
    case "success":
      return (
        <>
          <WeatherCard result={status.result} />
          <HourlyChart result={status.result} />
          <DailyChart result={status.result} />
          <UVIndexChart result={status.result} />
        </>
      );
    default:
      return assertNever(status);
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Run this on page load to restore saved preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

export function WeatherDashboard() {
  const status = useWeatherStore((s) => s.status);

  return (
    <div className="container">
      {/* 1. Header & Branding Section */}
      <header className="header-bar">
        <div className="brand-wrapper">
          <div className="brand-icon">⚡</div>
          <div>
            <h1 className="brand-title">Daily Metrics</h1>
            <p className="brand-tagline">Real-time Analytics Dashboard</p>
          </div>
        </div>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <span>Theme 🌗</span>
        </button>
      </header>
      <SearchBar />
      <StatusContent status={status} />
      <FooterCard />
    </div>
  );
}
