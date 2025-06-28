import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveShortLink } from '../utils/storage';
import '../styles/App.css';

function ShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [validMinutes, setValidMinutes] = useState('');
  const [preferredCode, setPreferredCode] = useState('');
  const [shortResult, setShortResult] = useState(null);

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now();
    const shortCode = preferredCode || generateShortCode();
    const expiresAt = validMinutes ? now + parseInt(validMinutes) * 60000 : null;

    const newLink = {
      originalUrl,
      shortCode,
      createdAt: now,
      expiresAt,
      clicks: []
    };

    saveShortLink(newLink);

    setShortResult({
      ...newLink,
      fullUrl: `${window.location.origin}/${shortCode}`,
    });

    // Reset input fields
    setOriginalUrl('');
    setValidMinutes('');
    setPreferredCode('');
  };

  return (
    <div className="container">
      <h2>🔗 URL Shortener</h2>

      <Link to="/stats" className="nav-link">📊 View Statistics</Link>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Valid for (minutes)"
          value={validMinutes}
          onChange={(e) => setValidMinutes(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preferred short code (optional)"
          value={preferredCode}
          onChange={(e) => setPreferredCode(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {shortResult && (
        <div className="result-box">
          <p><strong>Original URL:</strong> {shortResult.originalUrl}</p>
          <p>
            <strong>Shortened URL:</strong>{' '}
            <a href={`/${shortResult.shortCode}`} target="_blank" rel="noopener noreferrer">
              {shortResult.fullUrl}
            </a>
          </p>
          <p>
            <strong>Expires At:</strong>{' '}
            {shortResult.expiresAt ? new Date(shortResult.expiresAt).toLocaleString() : '∞'}
          </p>
        </div>
      )}
    </div>
  );
}

export default ShortenerPage;
