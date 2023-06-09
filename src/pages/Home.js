

import './Modalita.css';
import './Ho.css';
import './Home.css';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Form, Navbar, Nav, Modal,Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faCube, faCheck,faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import axios from 'axios';
import './App.css';
import Alert from 'react-bootstrap/Alert';

function Home() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedRobot, setSelectedRobot] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteText, setInviteText] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [lastInvites, setLastInvites] = useState([]);
  const uniqueFriends = Array.from(new Set(lastInvites));
  const robotListRef = useRef(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [email, setEmail] = useState('');
 
 
 useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
  
     
    }
  }, []);
  const storedEmail = localStorage.getItem('email');
  const storedid = localStorage.getItem('id');
  const storedname = localStorage.getItem('name');
  fetch(`http://localhost:8080/player/email/${storedEmail}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
     localStorage.setItem('id', data.id_player);
    localStorage.setItem('name', data.name);
  })
  .catch(error => {
    console.error('Error retrieving user data:', error);
  });

 


  const [userData, setUserData] = useState({});

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



  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
 // localStorage.removeItem('id2');
/*
  const handleInviteClick = () => {
    if (inviteText) {
      setShowInviteModal(true);
      setLastInvites([...lastInvites, inviteText]);
      localStorage.setItem('recipientemail', inviteText);
      fetch(`http://localhost:8080/player/email/${inviteText}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('recipientid', data.id_player);
      
      })
      .catch(error => {
        console.error('Error retrieving player data:', error);
      });
  }
  setIsDropdownOpen(false);
};
*/

const handleInviteClick = () => {
  if (inviteText) {
    fetch(`http://localhost:8080/player/exists/${inviteText}`)
      .then(response => response.text())
      .then(data => {
        if (data === "Trovato") {
          setShowInviteModal(true);
          setLastInvites([...lastInvites, inviteText]);
          localStorage.setItem('recipientemail', inviteText);
          fetch(`http://localhost:8080/player/email/${inviteText}`)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('recipientid', data.id_player);
            })
            .catch(error => {
              console.error('Error retrieving player data:', error);
            });
        } else {
          alert("L'account non esiste.");
          localStorage.removeItem('recipientid');
        }
      })
      .catch(error => {
        console.error('Error checking email existence:', error);
      });
  }
  setIsDropdownOpen(false);
};

const memo=localStorage.getItem('recipientid');

  const handleInviteTextChange = (event) => {
    setInviteText(event.target.value);
  };

  const handleInviteModalClose = () => {
    setShowInviteModal(false);
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  const handleRobotSelect = (robotName) => {
    setSelectedRobot(robotName);
  };
/*
  

  const handleConfirm = () => {
    const selectedMode = localStorage.getItem('selectedMode');
    const selectedTurn = localStorage.getItem('selectedTurn');
  const selectrec=localStorage.getItem('recipientid');
  const gameData = {
      classe: selectedClass, // varchar
      robot: selectedRobot, // varchar
      modalita: selectedMode, // varchar
      turni: selectedTurn, // integer
       id: storedid , 
      name: storedname
    };

    

    
    fetch("http://localhost:8080/game/add", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(gameData)
    })
  
  

 
    
    .then(response => response.json())
    .then(data => {
      console.log( data);
      localStorage.setItem('gameidentificativo', data);

     
      
    })
    .catch(error => {
      console.error('Error sending game data:', error);
     
    });
    const selectgid=localStorage.getItem('gameidentificativo');
    const inviteData = {
        game_id: selectgid, // varchar
        sender_id: storedid, // varchar
        recipientid: selectrec, // varchar
      
        accepted: "false"
      };
      fetch("http://localhost:8080/invitations/add", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(inviteData)
      })
      //.then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/about');
      })
      .catch(error => {
        console.error('Error sending invitation data:', error);
      });
    
   
  };

  */
  const handleConfirm = () => {
    const selectedMode = localStorage.getItem('selectedMode');
    const selectedTurn = localStorage.getItem('selectedTurn');
    const selectrec = localStorage.getItem('recipientid');
    const gameData = {
      classe: selectedClass, // varchar
      robot: selectedRobot, // varchar
      modalita: selectedMode, // varchar
      turni: selectedTurn, // integer
      id: storedid,
      name: storedname
    };
    if (!selectedClass || !selectedRobot || inviteText === '') {
      alert('Devi selezionare una classe, un robot e inserire un ID amico nel invito.');
      return;
    }
    if (!selectrec) {
      alert('Devi inserire un ID valido per l\'amico invitato.');
      return;
    }



    
    fetch("http://localhost:8080/game/add", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(gameData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('gameidentificativo', data);
  
        const selectgid = localStorage.getItem('gameidentificativo');
        
  
  
    const inviteData = {
      game_id: selectgid, // varchar
      senderid: storedid, // varchar
      recipientid: selectrec, // varchar
      accepted: "false"
    };
    return fetch("http://localhost:8080/invitations/newadd", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(inviteData)
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log("id eccolo",data.id);
    localStorage.setItem('invtoId', data.id);
    navigate('/Casa');
  })
  .catch(error => {
    console.error('Error sending invitation data:', error);
  });

  };
  
  const renderSuggestedFriends = () => {
    const suggestedFriends = uniqueFriends.slice(0, 4);
    return (
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'absolute',
          zIndex: 1,
          overflow: 'auto',
          maxHeight: 300,
          marginTop: 2, // Add margin top here
        }}
        subheader={<li />}
      >
        <li>
          <ul>
            <ListSubheader>Amici Suggeriti</ListSubheader>
            {suggestedFriends.map((friend) => (
              <ListItem key={friend} button onClick={() => setInviteText(friend)}>
                <ListItemText primary={friend} />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
    );
  };
  useEffect(() => {
    const storedId = localStorage.getItem('id');
    fetch(`http://localhost:8080/invitations/${storedId}/recent`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("we",data);
      setLastInvites(data);

    })
    .catch(error=> {
      console.error('Error retrieving invitation data:', error);
    });
    
  }, []);
/*
  const classList = [
    { name: 'Classe 1', icon: faCube },
    { name: 'Classe 2', icon: faCube },
    { name: 'Classe 3', icon: faCube }
  ].filter((classItem) => {
    return classItem.name.toLowerCase().includes(searchTerm.toLowerCase());
  });*/

  const [classList, setClassList] = useState([]);
  
    
  
  useEffect(() => {
    fetch('http://localhost:8090/classut_repo/viewAll')
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        console.log("wewe",data);
        const items = data.getElementsByTagName("item");
        const newClassList = Array.from(items).map(item => {
          const name = item.getAttribute("name");
          return { name: name, icon: faCube };
        }).filter(classItem => {
          return classItem.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setClassList(newClassList);
      });
  }, [searchTerm]);

  const robotList = [
    { name: 'Randoop', icon: faRobot },
    { name: 'Evosuite', icon: faRobot }
  ];

  if (!email) {
    return (
      <div>Accesso proibito. Esegui il login per accedere a questa pagina.</div>
    );
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Scelta configurazione</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
 <Nav.Item style={{ display: 'flex', alignItems: 'center',marginRight: '-4.5rem' }}>
 <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ background: 'none', border: 'none', padding: '0', color: 'black' }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.3rem', color:'black' }} />
                {email}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item style={{ color: 'black' }} href="#/action-1">Profilo</Dropdown.Item>
                <Dropdown.Item style={{ color: 'black' }} href="#/action-2">Impostazioni</Dropdown.Item>
                <Dropdown.Divider />
                
                <Dropdown.Item style={{ color: 'black' }} onClick={handleLogout}>Esci</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={3}>
            <h4>Classi disponibili</h4>
            <Form className="d-flex">
              <Form.Control type="text" placeholder="Cerca classe" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            </Form>
            <ListGroup style={{ height: '400px', overflowY: 'auto', marginTop: '1rem' }}>
              {classList.map((classItem) => (
                <ListGroup.Item
                  key={classItem.name}
                  action
                  active={selectedClass === classItem.name}
                  onClick={() => handleClassSelect(classItem.name)}
                  className="d-flex align-items-center"
                  style={{ paddingRight: '0.5rem' }}
                >
                  {selectedClass === classItem.name ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'blue', marginRight: '0.5rem' }} />
                      <span style={{ marginLeft: '0.5rem' }}>{classItem.name}</span>
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={classItem.icon} style={{ marginRight: '0.5rem' }} />
                      <span style={{ marginLeft: '0.5rem' }}>{classItem.name}</span>
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <div className="circle-container" style={{ marginBottom: '105rem' }}>
              {isDropdownOpen && (
                <div className="search-container position-relative ">
                  <div className="input-container">
                  <input type="text" placeholder="Inserisci Id amico" value={inviteText} onChange={handleInviteTextChange} />
                  {renderSuggestedFriends()}
                  </div>
                  <button className="invite-button" onClick={() => handleInviteClick(inviteText)}>
                    Invita
                  </button>
                </div>
              )}
              
              <div className={`circle ${isDropdownOpen ? 'open' : ''} ${isDropdownOpen ? 'hide' : ''}`} onClick={handleToggleDropdown}>
                <span className="invite-friends">Invita Amici</span>
              </div>
              
            </div>
          </Col>
          <Col md={3}>
            <h4>Robot disponibili</h4>
            <ListGroup style={{ height: '400px', overflowY: 'auto', maxWidth: '400px' }} ref={robotListRef}>
              {robotList.map((robot) => (
                <ListGroup.Item
                  key={robot.name}
                  action
                  active={selectedRobot === robot.name}
                  onClick={() => handleRobotSelect(robot.name)}
                  className={`d-flex align-items-center ${selectedRobot === robot.name ? 'robot-selected' : ''}`}
                  data-robot-name={robot.name}
                  style={{ paddingRight: '0.5rem' }}
                >
                  {selectedRobot === robot.name ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'blue', marginRight: '0.5rem' }} />
                      <span style={{ marginLeft: '0.5rem' }}>{robot.name}</span>
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={robot.icon} style={{ marginRight: '0.5rem' }} />
                      <span style={{ marginLeft: '0.5rem' }}>{robot.name}</span>
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <footer className="mt-4 py-3 bg-light text-center">
        <div className="navigation">
          <a href="/mod">
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'black' }} />
          </a>
          <Button variant="primary" size="md" className="confirm-button" onClick={handleConfirm}>
            
  Conferma selezione

</Button>
          <a href="/about">
            <FontAwesomeIcon icon={faArrowRight} style={{ color: 'black' }} />
          </a>
        </div>
      </footer>
      <Modal show={showInviteModal} onHide={handleInviteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invita amico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hai inviato un invito all'amico con ID: <strong>{inviteText}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInviteModalClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default Home;


