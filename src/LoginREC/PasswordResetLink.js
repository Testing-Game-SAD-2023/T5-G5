import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function PasswordResetForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/preset/request', { email: email })
      .then((response) => {
        if(response.data==="Not Found"){
          alert('Non esiste un account con questa email');
        }
     else{
        setSuccessMessage('Password reset link sent to your email');
        setError('');
     }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404 && error.response.data === "Not Found") {
          setError('L\'indirizzo email non esiste.');
     
        } else {
          setError('Si è verificato un errore durante la richiesta di ripristino password.');
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
 
      <div className="w-30">
      <h1>Password Reset</h1>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" size="md" value={email} onChange={handleEmailChange} />
        </Form.Group>
        <Button variant="primary" type="submit"  className="mt-3">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default PasswordResetForm;