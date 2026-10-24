import React from "react";

export const FooterCard: React.FC = () => {
  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Project Context & Tech Stack */}
        <div className="footer-brand">
          <h3 className="footer-title">Weather Dashboard</h3>
          <p className="footer-description">
            Built with React, TypeScript, Zustand, and Recharts. Powered by the{" "}
            <a
              href="https://open-meteo.com"
              rel="noopener noreferrer"
              target="_blank"
              className="footer-link-accent"
            >
              Open-Meteo API
            </a>
            .
          </p>
        </div>

        {/* Connect / Social Navigation */}
        <nav className="footer-nav" aria-label="Developer Profiles">
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/CodeCrusher123"
                rel="noopener noreferrer"
                target="_blank"
                className="footer-link"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="http://www.linkedin.com/in/nilakesh-barman"
                rel="noopener noreferrer"
                target="_blank"
                className="footer-link"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Copyright Bar */}
      <hr className="footer-divider" aria-hidden="true" />
      <div className="footer-bottom">
        <small className="footer-copyright">
          &copy; {new Date().getFullYear()} Nilakesh Barman. All rights
          reserved.
        </small>
      </div>
    </footer>
  );
};
