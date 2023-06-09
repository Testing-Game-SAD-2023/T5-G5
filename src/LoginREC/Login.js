import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleInput = (event) => {        
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.post('http://localhost:8080/player/login', values)
    .then(response => {
      
      console.log(response.data);
      setError('');
      setValues({ email: '', password: '' });
      setLoggedIn(true);
      //localStorage.setItem('userId', response.data.userId); 
      localStorage.setItem('email', response.data); // Salva l'email dell'utente in localStorage
    })
    .catch(error => {
      console.error(error);
      const errorMessage = error.response.data;
    if (errorMessage === 'Email not verified.') {
      setError('Email not verified');
    } else {
      setError('Invalid username or password');
    }
    });
  }
  
    
  
  

  if (loggedIn) {
    return <Navigate to="/mod" />;
  }

  return (
    <Container className="login-container">
      <div className="login-box">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Indirizzo email</Form.Label>
            <Form.Control type="email" name="email" value={values.email} required onChange={handleInput} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={values.password} required onChange={handleInput} />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
          <Link to="/via" className="forgot-password-link">
            Password dimenticata?
          </Link>
          <Link to="/Signup" className="btn btn-secondary register-button">
            Registrati
          </Link>
        </Form>
      </div>
    </Container>
  );
}

export default Login;