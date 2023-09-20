import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Shorten.css'; // Import your custom CSS for styling

function ShortenUrlForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/shorten', {
        originalUrl,
        customAlias,
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="shorten-url-form">
        <h2 className="form-title">URL Shortener</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="originalUrl" className="form-label">
              Enter URL to shorten
            </label>
            <input
              type="text"
              id="originalUrl"
              className="form-input"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customAlias" className="form-label">
              Custom Alias (optional)
            </label>
            <input
              type="text"
              id="customAlias"
              className="form-input"
              placeholder="Anku"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            Shorten
          </button>
        </form>
        {shortUrl && (
          <div className="shortened-url">
            <p className="shortened-label">Shortened URL: <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shortened-link"
            >
              {shortUrl}
            </a></p>
           
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ShortenUrlForm;
