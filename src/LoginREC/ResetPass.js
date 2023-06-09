import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PasswordResetForm( ) {
  const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    // Aggiungi questo controllo per verificare se il token è stato ricevuto correttamente
    useEffect(() => {
      if (!token) {
        setErrorMessage('Invalid token');
      }
    }, [token]);
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Aggiungi questo controllo per verificare se la password inserita dall'utente è valida
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long');
        return;
      }
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, password: password }),
      };
  
      fetch('http://localhost:8080/preset/reset', requestOptions)
        .then((response) => response.text())
          .then((data) => {
            if (data === 'password-reset-error') {
              
              setErrorMessage('Token non valido');
            }
            else{
          setSuccessMessage('Password reset successful');
          setErrorMessage('');
          navigate('/');
            }
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setSuccessMessage('');
        });
    };
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <Row className="justify-content-center">
            <Col md={6}>
           
             
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={handlePasswordChange} style={{ width: '215%' }} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Reset Password
                </Button>
              </Form>
              {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
              {successMessage && <div className="text-success mt-3">{successMessage}</div>}
            </Col>
          </Row>
        </Container>
      );
    }
    
    export default PasswordResetForm;