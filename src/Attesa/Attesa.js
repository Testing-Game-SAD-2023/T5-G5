import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckAcceptedPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [dotIndex, setDotIndex] = useState(0);
  const [accepted, setAccepted] = useState(false); // stato di accettazione dell'invito
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const inviteId = localStorage.getItem('invtoId');
      if (!inviteId) {
        setMessage('ID invito non trovato nel localStorage');
        setLoading(false);
        return;
      }
  
      fetch(`http://localhost:8080/invitations/checkAccepted/${inviteId}`)
        .then(response => response.json())
        .then(data => {
          setMessage(data.message);
          setLoading(false);
          if (data.message === `Invitation with ID ${inviteId} has been accepted`) {
            setAccepted(true);
          }
        })
        .catch(error => {
          console.error('Errore durante la chiamata API:', error);
          setMessage('Errore durante la chiamata API');
          setLoading(false);
        });
    }, 3000); // Richiama l'API ogni 3 secondi
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (accepted) {
      navigate('/about');
    }
  }, [accepted, navigate]);

  useEffect(() => {
    const dotIntervalId = setInterval(() => {
      setDotIndex(dotIndex => (dotIndex + 1) % 4);
    }, 1000);

    return () => clearInterval(dotIntervalId);
  }, []);

  const dotSize = 40;

  if (loading) {
    return (
      <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {[0, 1, 2, 3].map(index => (
            <span key={index} style={{ marginRight: 5, fontSize: dotSize, color: '#ccc' }}>
              {index === dotIndex ? <span style={{ color: 'black', fontSize: '100px' }}>.</span> : ''}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (message !== 'Invitation not found' && message !== `Invitation with ID ${localStorage.getItem('invtoId')} has been accepted`) {
    return (
      <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {[0, 1, 2, 3].map(index => (
        <span key={index} style={{ marginRight: 5, fontSize: dotSize, color: '#ccc' }}>
        {index === dotIndex ? <span style={{ color: 'black', fontSize: '100px' }}>.</span> : ''}
      </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default CheckAcceptedPage;