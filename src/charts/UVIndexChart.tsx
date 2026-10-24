import { dailyDataTransform } from "./DailyChart";
import type { WeatherCardProps } from "../components/WeatherCard";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export function UVIndexChart({ result }: WeatherCardProps) {
  const { weather } = result;
  const uvIndexChartData = dailyDataTransform(weather);
  return (
    <div className="chart-box">
      <h3>7-Day UV Index</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={uvIndexChartData}
          margin={{ top: 12, right: 8, left: -12, bottom: 0 }}
          barCategoryGap="25%"
        >
          <CartesianGrid
            stroke="var(--grid)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
            dy={6}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />

          <Tooltip
            cursor={{ fill: "var(--grid)", opacity: 0.7 }}
            contentStyle={{
              backgroundColor: "var(--bg-card)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "10px 12px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
            }}
            labelStyle={{
              color: "var(--text)",
              fontWeight: 600,
              marginBottom: "6px",
            }}
            itemStyle={{
              color: "var(--text)",
              fontSize: "13px",
            }}
            formatter={(value) => [value, "Maximum UV Index"]}
          />

          <Bar
            dataKey="uvIndex"
            name="Maximum UV Index"
            fill="var(--accent)"
            radius={[5, 5, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
