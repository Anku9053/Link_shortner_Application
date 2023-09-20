import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RedirectUrl() {
  const { shortUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/${shortUrl}`);
        window.location.href = response.request.responseURL;
      } catch (err) {
        setError('URL not found or expired.');
        setLoading(false);
      }
    };

    redirect();
  }, [shortUrl]);

  if (loading) {
    return <p>Redirecting...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return null;
}

export default RedirectUrl;
