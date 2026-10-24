import { useState } from "react";
import type { WeatherCardProps } from "../components/WeatherCard";
import type { WeatherInterface } from "../utilities/WeatherApi";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

function dataTransform(weather: WeatherInterface) {
  const currentTime = new Date(weather.current.time);
  const startIndex = weather.hourly.time.findIndex(
    (value) => new Date(value) >= currentTime,
  );
  const safeStartIndex = startIndex > -1 ? startIndex : 0;
  const chartArrayData = weather.hourly.time
    .slice(safeStartIndex, safeStartIndex + 24)
    .map((t: string, i: number) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "2-digit",
        hour12: true,
      }),
      temp: Math.round(weather.hourly.temperature_2m[i]),
      precipitation: Math.round(weather.hourly.precipitation_probability[i]),
    }));
  return chartArrayData;
}

export function HourlyChart({ result }: WeatherCardProps) {
  const { weather } = result;
  const chartArrayData = dataTransform(weather);
  const [metric, setMetric] = useState<"temperature" | "precipitation">(
    "temperature",
  );
  const metricConfig = {
    temperature: {
      dataKey: "temp",
      name: "Temperature",
      unit: "°C",
      stroke: "#f97316",
    },
    precipitation: {
      dataKey: "precipitation",
      name: "Precipitation Probability",
      unit: "%",
      stroke: "#164bf9",
    },
  };

  const configThis = metricConfig[metric];

  return (
    <div className="chart-box">
      <h3>Hourly {configThis.name}</h3>
      <div className="btn-group">
        <button
          className={`graph-btn ${metric === "temperature" ? "active" : ""}`}
          onClick={() => setMetric("temperature")}
        >
          Temperature
        </button>
        <button
          className={`graph-btn ${metric === "precipitation" ? "active" : ""}`}
          onClick={() => setMetric("precipitation")}
        >
          Precipitation
        </button>
      </div>

      {/* Uses CSS classes instead of hardcoded inline styles */}
      <div className="chart-scroll-wrapper">
        <div className="chart-inner-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartArrayData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" interval={3} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <Line
                type="monotone"
                dataKey={configThis.dataKey}
                name={configThis.name}
                unit={configThis.unit}
                stroke={configThis.stroke}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
