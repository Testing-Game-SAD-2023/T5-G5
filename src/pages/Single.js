import { faRobot, faCube, faCheck,faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Form, Navbar, Nav,Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';


import './Home.css';

function Home() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedRobot, setSelectedRobot] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const robotListRef = useRef(null);
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
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleRobotSelect = (robotName) => {
    setSelectedRobot(robotName);
  };

  const handleConfirm = () => {
    const selectedMode = localStorage.getItem('selectedMode');
    const selectedTurn = localStorage.getItem('selectedTurn');

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
    
    //.then(response => response.json())
    .then(data => {
      console.log('Game data sent to server:', data);
      navigate('/about');
    })
    .catch(error => {
      console.error('Error sending game data:', error);
      console.log('json', gameData);
    });
  };
  
  const classList = [
    { name: 'Classe 1', icon: faCube },
    { name: 'Classe 2', icon: faCube },
    { name: 'Classe 3', icon: faCube }
  ].filter((classItem) => {
    return classItem.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const robotList = [
    { name: 'Randoop', icon: faRobot },
    { name: 'Evosuite', icon: faRobot }
  ];

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
          <Col md={6}></Col>
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
      <div className="navigation">
        <Button variant="link" href="/mod" className="navigation-button">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'black' }} />
        </Button>
        <Button variant="primary" size="md" className="confirm-button" onClick={handleConfirm}>
          Conferma selezione
        </Button>
        <Button variant="link" href="/about" className="navigation-button">
          <FontAwesomeIcon icon={faArrowRight} style={{ color: 'black' }} />
        </Button>
      </div>
    </div>
  );
}

export default Home;