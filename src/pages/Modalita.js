import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Navbar, Dropdown, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Modalita.css';
import './aggiunta.css'
function Modalita() {
  const [gameMode, setGameMode] = useState('');
  const [numTurns, setNumTurns] = useState('');
  const [showInvites, setShowInvites] = useState(false); // Stato per il modale degli inviti ricevuti
  const navigate = useNavigate();
  // Recupera i valori memorizzati nel LocalStorage
const gamee = localStorage.getItem('gameId');
const invito = localStorage.getItem('inviteId');

// Stampa i valori nel LocalStorage
console.log('Valore di gameId nel LocalStorage:', gamee);
console.log('Valore di inviteId nel LocalStorage:', invito);

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    localStorage.setItem('gameMode', mode);
  };

  const [gameIds, setGameIds] = useState([]);
  const [InvitoIds, setInvitoIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamesData, setGamesData] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  
  const [selectedId, setSelectedId] = useState(null);
  const [emails, setEmails] = useState([]);

  const [userData, setUserData] = useState({});
  /*
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedId = localStorage.getItem('id');
    const storedName = localStorage.getItem('name');
    if (storedEmail && !userData.id) {
      fetch(`http://localhost:8080/player/email/${storedEmail}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          localStorage.setItem('id', data.id_player);
          localStorage.setItem('name', data.name);
          setUserData(data);
        })
        .catch(error => {
          console.error('Error retrieving user data:', error);
        });
    } else {
      setUserData({
        id_player: storedId,
        name: storedName,
      });
    }
  }, []);
  */
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedId = localStorage.getItem('id');
    const storedName = localStorage.getItem('name');
    if (storedEmail && !userData.id) {
      fetch(`http://localhost:8080/player/email/${storedEmail}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          localStorage.setItem('id', data.id_player);
          localStorage.setItem('name', data.name);
          setUserData(data);
  
          // esegui la chiamata API per recuperare gli inviti
          fetch(`http://localhost:8080/invitations/recuperoinviti/${data.id_player}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              const invitoid = data.map(invitation => invitation.id);
              const ids = data.map(invitation => invitation.senderid);
              setSenderIds(ids);
              setInvitoIds(invitoid);
              setGameIds(data.map(invitation => invitation.game_id));
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error retrieving invitation data:', error);
              setError(error);
              setIsLoading(false);
            });
        })
        .catch(error => {
          console.error('Error retrieving user data:', error);
        });
    } else {
      setUserData({
        id_player: storedId,
        name: storedName,
      });
  
      // esegui la chiamata API per recuperare gli inviti
      fetch(`http://localhost:8080/invitations/recuperoinviti/${storedId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          const invitoid = data.map(invitation => invitation.id);
          const ids = data.map(invitation => invitation.senderid);
          setSenderIds(ids);
          setInvitoIds(invitoid);
          setGameIds(data.map(invitation => invitation.game_id));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error retrieving invitation data:', error);
          setError(error);
          setIsLoading(false);
        });
    }
  }, []);
 /*
useEffect(() => {
  const storedId = localStorage.getItem('id');
  fetch(`http://localhost:8080/invitations/recuperoinviti/${storedId}`)

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const invitoid=data.map(invitation => invitation.id);
      const ids = data.map(invitation => invitation.senderid);
      setSenderIds(ids);
      setInvitoIds(invitoid);
     
      setGameIds(data.map(invitation =>invitation.game_id));
      
      setIsLoading(false);
    })
    .catch(error=> {
      console.error('Error retrieving invitation data:', error);
      setError(error);
      setIsLoading(false);
    });
}, []);
*/
  const handleNumTurnsSelect = (num) => {
    setNumTurns(num);
    localStorage.setItem('numTurns', num);
  };
/*
  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/');
  };
  */
  const handleLogout = () => {
    const sessionId = localStorage.getItem('sessionId');
  
    fetch(`http://localhost:8080/player/logout?sessionId=${sessionId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `sessionId=${sessionId}` // aggiungi l'ID della sessione come cookie
  },
  body: null // passa null come corpo della richiesta
})
.then(response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  localStorage.removeItem('email');
  localStorage.removeItem('sessionId');
  navigate('/');
})
.catch(error => {
  console.error(error);
  const errorMessage = error.message;
  if (errorMessage === 'Not logged in') {
    setError('You are not logged in');
  }
});
  };

  useEffect(() => {
    
    const handleBeforeUnload = (e) => {
      const sessionId = localStorage.getItem('sessionId');
      fetch(`http://localhost:8080/player/logout?sessionId=${sessionId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `sessionId=${sessionId}` // aggiungi l'ID della sessione come cookie
  },
  body: null // passa null come corpo della richiesta
})
        .then(response => {
          console.log('API call successful');
        })
        .catch(error => {
          console.log('API call failed', error);
        });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleStartGame = () => {
    localStorage.setItem('selectedTurn', numTurns);
    localStorage.setItem('selectedMode', gameMode);
    if (gameMode === 'singolo') {
      navigate('/Single');
    } else if (gameMode === 'multigiocatore') {
      navigate('/Multi');
    }
  };

  const savedGameMode = localStorage.getItem('gameMode');
  const savedNumTurns = localStorage.getItem('numTurns');
  const userEmail = localStorage.getItem('email');
  
  useEffect(() => {
    if (savedGameMode) {
      setGameMode(savedGameMode);
    }
    if (savedNumTurns) {
      setNumTurns(savedNumTurns);
    }
  }, []);

  const handleShowInvites = (ids) => {
    setShowInvites(true);
    setSelectedId(ids);
   

    Promise.all(ids.map(id =>
      fetch(`http://localhost:8080/player/${id}/email`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
    ))
    .then(emailsArray => {
      const emails = emailsArray.map(emailObject => ({
        email: emailObject.email,
        isValid: emailObject.valid || null
      }));
      setEmails(emails);
    })
    .catch(error => {
      console.error('Error retrieving email data:', error);
      setEmails([]);
    });
    
  };

  const handleCloseInvites = () => {
    setShowInvites(false);
  };

  
  useEffect(() => {
    Promise.all(gameIds.map(gameId =>
      fetch(`http://localhost:8080/game/${gameId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
    ))
    .then(gamesData => {
      setGamesData(gamesData);
      console.log("waglio",gamesData);
    })
    .catch(error => {
      console.error('Error retrieving game data:', error);
      setGamesData([]);
    });
  }, [gameIds]);


  
  //console.log("cisei",scu);

  function handleConfirmEmail(gameId,inviteId) {
    localStorage.setItem('gameId', gameId);
    localStorage.setItem('inviteId', inviteId);
    console.log('Valore di gameId nel LocalStorage:', localStorage.getItem('gameId'));
  console.log('Valore di inviteId nel LocalStorage:', localStorage.getItem('inviteId'));
        
    fetch(`http://localhost:8080/game/${gameId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { robot, classe, turni, modalita } = data;
      const nomino= localStorage.getItem('name');
      const nid= localStorage.getItem('id');

      const gameData = {
        robot: robot,
        classe: classe,
        turni: turni,
        modalita: modalita,
        name:nomino,
        id:nid
      }
      fetch(`http://localhost:8080/invitations/accept/${inviteId}`, {
        method: 'PUT'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Invito accettato con successo.');
        
      })
      .catch(error => {
        console.error('Errore durante l\'accettazione dell\'invito:', error);
      });
      fetch('http://localhost:8080/game/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Dati del gioco inviati al server:', data);
       navigate('/join');
      })
      .catch(error => {
        console.error('Errore durante la chiamata API per aggiungere il gioco:', error);
      });
    })
    .catch(error => {
      console.error('Errore durante la conferma dell\'email:', error);
    });
/*
    fetch(`http://localhost:8080/invitations/delete/${inviteId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Invito eliminato con successo.');
      })
      .catch(error => {
        console.error('Errore durante la cancellazione dell\'invito:', error);
      });
    
   */


  }
  function handleRejectEmail(inviteId) {
    const storedId = localStorage.getItem('id');
    fetch(`http://localhost:8080/invitations/delete/${inviteId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Invito eliminato con successo.');
      setIsLoading(true); 
      return fetch(`http://localhost:8080/invitations/recuperoinviti/${storedId}`); 
    })
    .then(response =>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const invitoid = data.map(invitation => invitation.id);
      const ids = data.map(invitation => invitation.senderid);
      setSenderIds(ids);
      setInvitoIds(invitoid);
      setGameIds(data.map(invitation =>invitation.game_id));
      setIsLoading(false); // Imposta isLoading su false per nascondere l'indicatore di caricamento
    })
    .catch(error => {
      console.error('Errore durante la cancellazione dell\'invito:', error);
    });
  }
  if (!userEmail) {
    return (
      <div>Accesso proibito. Esegui il login per accedere a questa pagina.</div>
    );
  }

  return (
   
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#">Configura nuova partita</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ marginRight: '2rem' }}>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ background: 'none', border: 'none', padding: '0', color: 'black' }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.3rem', color:'black' }} />
                {userEmail}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item style={{ color: 'black' }} href="#/action-1">Profilo</Dropdown.Item>
                <Dropdown.Item style={{ color: 'black' }} onClick={() => handleShowInvites(senderIds)}>
 
                  Inviti ricevuti <FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: '0.3rem' }} />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item style={{ color: 'black' }} onClick={handleLogout}>Esci</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <h4>Modalità di gioco</h4>
            <ul className="list-group">
              <li
                className={`list-group-item ${
                  gameMode === 'singolo' ? 'active' : ''
                }`}
                onClick={() => handleGameModeSelect('singolo')}
              >
                Singolo giocatore
              </li>
              <li
                className={`list-group-item ${
                  gameMode === 'multigiocatore' ? 'active' : ''
                }`}
                onClick={() => handleGameModeSelect('multigiocatore')}
              >
                Multigiocatore
              </li>
            </ul>        
              </Col>
          <Col md={4}>
            <h4>Seleziona numero di turni</h4>
            <Form>
              <Form.Group controlId="selectTurn">
                <Form.Control as="select" value={numTurns} onChange={(e) => handleNumTurnsSelect(e.target.value)}>
                  <option value="1">1 Turno</option>
                  <option value="2">2 Turni</option>
                  <option value="3">3 Turni</option>
                  <option value="4">4 Turni</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={4} className="d-flex align-items-end justify-content-center">
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ span: 4, offset: 4 }} className="text-center">
            <Button variant="primary" className="mt-4" onClick={handleStartGame}>
              Avvia gioco
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Componente modale per gli inviti ricevuti */}
      <Modal show={showInvites} onHide={handleCloseInvites} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Inviti ricevuti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup>
          {}
        </ListGroup>
        </Modal.Body>
 
        <h2>Emails</h2>
        <ul>
            {emails.map((email, index) => (
  <li key={email.email }>
    
    
    <span>Email: {email.email}</span>
    
    <span> - IDinvito: {InvitoIds[index]}</span>
    { (
      <>
        <button className="btn btn-danger " style={{ marginTop: '0rem', padding: '-3rem 0rem' }}  onClick={() => handleConfirmEmail(gamesData[index].id_partita,InvitoIds[index])}>Accetta</button>
        <button className="btn btn-danger" onClick={() => handleRejectEmail(InvitoIds[index])}>Rifiuta</button>
      </>
    )}
    </li>
))}
      
      </ul>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInvites}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modalita;