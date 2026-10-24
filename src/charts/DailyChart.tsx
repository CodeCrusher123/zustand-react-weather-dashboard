import type { WeatherCardProps } from "../components/WeatherCard";
import type { WeatherInterface } from "../utilities/WeatherApi";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export function dailyDataTransform(weather: WeatherInterface) {
  const dailyChartData = weather.daily.time.map((t: string, i: number) => ({
    day: new Date(t).toLocaleDateString([], { weekday: "short" }),
    max: Math.round(weather.daily.temperature_2m_max[i]),
    min: Math.round(weather.daily.temperature_2m_min[i]),
    uvIndex: weather.daily.uv_index_max[i],
  }));
  return dailyChartData;
}

export function DailyChart({ result }: WeatherCardProps) {
  const { weather } = result;
  const dailyChartData = dailyDataTransform(weather);
  return (
    <div className="chart-box">
      <h3>7-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dailyChartData}
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
            unit="°C"
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
              padding: "2px 0",
            }}
            formatter={(value, name) => [
              `${value}°C`,
              name === "max" ? "Maximum" : "Minimum",
            ]}
          />

          <Bar
            dataKey="max"
            name="Maximum"
            radius={[5, 5, 0, 0]}
            fill="var(--chart-bar1)"
            maxBarSize={28}
          />

          <Bar
            dataKey="min"
            name="Minimum"
            radius={[5, 5, 0, 0]}
            fill="var(--chart-bar2)"
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
