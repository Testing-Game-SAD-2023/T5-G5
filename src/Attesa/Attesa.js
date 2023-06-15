import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function CheckAcceptedPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [dotIndex, setDotIndex] = useState(0);
  const [accepted, setAccepted] = useState(false); // stato di accettazione dell'invito
  const navigate = useNavigate();
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(true);
  const inviteId = localStorage.getItem('invtoId');
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = () => {
      fetch(`http://localhost:8080/invitations/${inviteId}/offbyid`, {
        method: 'PUT',
      })
        .then(response => {
          console.log('API call successful');
        })
        .catch(error => {
          console.log('API call failed', error);
        });
    };
  
    const handleUnload = () => {
      fetch(`http://localhost:8080/invitations/${inviteId}/offbyid`, {
        method: 'PUT',
      })
        .then(response => {
          console.log('API call successful');
        })
        .catch(error => {
          console.log('API call failed', error);
        });
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [inviteId]);
  
  useEffect(() => {
    return () => {
      fetch(`http://localhost:8080/invitations/${inviteId}/offbyid`, {
        method: 'PUT',
      })
        .then(response => {
          console.log('API call successful');
        })
        .catch(error => {
          console.log('API call failed', error);
        });
    };
  }, []);
/*
  useEffect(() => {
    const handlePopstate = (e) => {
      fetch(`http://localhost:8080/invitations/${inviteId}/offbyid`, {
        method: 'PUT',
      })
        .then(response => {
          console.log('API call successful');
       // Imposta shouldBlockNavigation su false quando l'utente naviga indietro nella storia del browser
        })
        .catch(error => {
          console.log('API call failed', error);
        });
    };
  
    window.addEventListener('popstate', handlePopstate);
  
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [inviteId]);
  */
 
  const handleConfirmNavigation = () => {
    //const onpage = 'pagina_successiva'; // valore di esempio
    fetch(`http://localhost:8080/invitations/${inviteId}/onbyid`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
     
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setIsConfirmed(true);
         // naviga alla pagina specificata
      })
      .catch(error => {
        console.log(error);
      });
  
  };
  useEffect(() => {
    if(isConfirmed){
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
    }, 2000); // Richiama l'API ogni 3 secondi
  
    return () => clearInterval(intervalId);
  }
  }, [isConfirmed]);

  useEffect(() => {
    if (accepted && isConfirmed) {
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
    
          {shouldBlockNavigation && (
        <Button variant="primary" onClick={handleConfirmNavigation}>Crea Lobby</Button>
      )}
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
        <div>
      {/* Component JSX */}
      {shouldBlockNavigation }
    </div>
      </div>
    );
  }

  return null;
}

export default CheckAcceptedPage;