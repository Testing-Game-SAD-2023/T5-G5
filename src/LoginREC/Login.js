import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';
import Cookies from 'js-cookie';


// Crea un'istanza di CookieJar

// Abilita la gestione dei cookie in axios



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
  
    axios.post('http://localhost:8080/player/login22', values)
    .then(response => {
      //const sessionId = response.headers['set-cookie'][0].match(/sessionId=([^;]+)/)[1];
     
      const { sessionId, email } = response.data;
      
     
    //console.log("prova",sessionId);
      console.log(response.data);
      setError('');
      setValues({ email: '', password: '' });
      setLoggedIn(true);
      //Cookies.set('sessionId', response.data.sessionId, { expires: new Date(response.data.sessionExpiry) });
     
      
      //localStorage.setItem('userId', response.data.userId); 
      localStorage.setItem('email', email); // Salva l'email dell'utente in localStorage
      localStorage.setItem('sessionId', sessionId); // Salva l'ID della sessione in localStorage
      console.log("cookie",response.sessionId);
      // Salva l'email dell'utente in localStorage
    })
    .catch(error => {
      console.error(error);
      const errorMessage = error.message;
    if (errorMessage === 'Email not verified.') {
      setError('Email not verified');
    } 
    else if (errorMessage === 'Invalid username or password.') {
      setError('Invalid username or password');
    }
    else if (errorMessage === 'User is already logged in.'){
      setError('You are already logged in');
    }
    else if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);
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