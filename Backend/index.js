
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000; // Change this to your preferred port number

// In-memory URL mapping
const urlMap = {};
const customUrls = {};

app.use(bodyParser.json());
app.use(cors());

// API endpoint to shorten a URL
app.post('/shorten', (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required.' });
  }

  if (customAlias) {
    if (customUrls[customAlias]) {
      return res.status(400).json({ error: 'Custom alias already exists.' });
    }
    // Store the custom alias and its corresponding original URL
    customUrls[customAlias] = originalUrl;
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${customAlias}` });
  } else {
    const shortId = generateRandomString(6);
    urlMap[shortId] = { url: originalUrl, timestamp: Math.floor(Date.now() / 1000) };
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
  }
});

// API endpoint to redirect to the original URL
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  if (customUrls[shortUrl]) {
    // Redirect to the custom alias URL
    return res.redirect(customUrls[shortUrl]);
  } else if (urlMap[shortUrl]) {
    const { url, timestamp } = urlMap[shortUrl];
    if (isUrlExpired(timestamp)) {
      delete urlMap[shortUrl];
      return res.status(404).send('URL not found or expired.');
    }
    // Redirect to the original URL
    return res.redirect(url);
  } else {
    return res.status(404).send('URL not found.');
  }
});

// Helper function to generate random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

// Helper function to check if URL is expired
function isUrlExpired(timestamp) {
  const urlLifetime = 3600; // URL lifetime in seconds (1 hour)
  return Math.floor(Date.now() / 1000) - timestamp > urlLifetime;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// https://petapixel.com/assets/uploads/2015/05/montblancpanoramahead.jpg