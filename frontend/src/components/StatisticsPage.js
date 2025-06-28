import React, { useEffect, useState } from 'react';
import { getShortLinks } from '../utils/storage';
import '../styles/App.css';

function StatisticsPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const data = getShortLinks();

    const countMap = {};
    data.forEach(link => {
      countMap[link.shortCode] = (countMap[link.shortCode] || 0) + 1;
    });

    const enriched = data.map(link => ({
      ...link,
      createdCount: countMap[link.shortCode],
    }));

    setLinks(enriched);
  }, []);

  const formatDate = ts => ts ? new Date(ts).toLocaleString() : '∞';
  const getMinutesRemaining = (expiry) => {
    if (!expiry) return '∞';
    const now = Date.now();
    return Math.max(0, Math.floor((expiry - now) / 60000));
  };

  return (
    <div className="container">
      <h2>📊 URL Statistics</h2>
      {links.length === 0 ? (
        <p>No shortened URLs found.</p>
      ) : (
        links.map(link => (
          <div key={link.shortCode} className="stats-box">
            <p><strong>Short URL:</strong> {window.location.origin}/{link.shortCode}</p>
            <p><strong>Original URL:</strong> {link.originalUrl}</p>
            <p><strong>Created at:</strong> {formatDate(link.createdAt)}</p>
            <p><strong>Expires at:</strong> {formatDate(link.expiresAt)}</p>
            <p><strong>Minutes Remaining:</strong> {getMinutesRemaining(link.expiresAt)}</p>
            <p><strong>Total Times Created:</strong> {link.createdCount}</p>
            <p><strong>Total Clicks:</strong> {link.clicks.length}</p>

            {link.clicks.length > 0 && (
              <div className="click-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Timestamp</th>
                      <th>Referrer</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {link.clicks.map((click, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(click.timestamp).toLocaleString()}</td>
                        <td>{click.referrer}</td>
                        <td>{click.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StatisticsPage;
