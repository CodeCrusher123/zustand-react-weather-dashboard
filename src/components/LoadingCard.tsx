export function LoadingCard() {
  return (
    <>
      <div className="loading-hero-card">
        <div className="loading-spinner"></div>
        <div className="loading-headline">Fetching weather data...</div>
        <div className="loading-subheadline">Querying Open-Meteo services</div>
      </div>

      {/* EXACT container className "stats-grid" here */}
      <div className="stats-grid">
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
        <div className="loading-stat-card">
          <div className="loading-bar-placeholder" />
        </div>
      </div>
    </>
  );
}
