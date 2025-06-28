import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortLinks, updateShortLink } from '../utils/storage';

function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const links = getShortLinks();
    const found = links.find(link => link.shortCode === shortCode);

    if (!found) {
      alert("Short link not found.");
      navigate('/');
      return;
    }

    const now = Date.now();
    if (found.expiresAt && now > found.expiresAt) {
      alert("This link has expired.");
      navigate('/');
      return;
    }

    const clickData = {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'Direct',
      location: 'Unknown', // You could fetch from an API like ipapi.co if needed
    };

    found.clicks.push(clickData);
    updateShortLink(found); // Update in localStorage

    // Redirect after logging
    window.location.href = found.originalUrl;
  }, [shortCode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
