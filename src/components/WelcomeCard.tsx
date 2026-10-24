import React from "react";

interface IdleWelcomeProps {
  onSelectCity: (cityName: string) => void;
}

export const WelcomeCard: React.FC<IdleWelcomeProps> = ({ onSelectCity }) => {
  const presets = ["London", "Tokyo", "New York", "Guwahati", "New Delhi"];

  return (
    <div className="idle-welcome-container">
      <div className="welcome-icon-wrapper">
        <span className="floating-cloud">🌤️</span>
      </div>
      <h2>Explore Weather Worldwide</h2>
      <p>
        Search for any city above to view live metrics, forecasts, and
        interactive charts.
      </p>

      <div className="quick-presets">
        <span className="preset-label">Quick select:</span>
        <div className="chip-group">
          {presets.map((cityName) => (
            <button
              key={cityName}
              type="button"
              className="preset-chip"
              onClick={() => onSelectCity(cityName)}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
