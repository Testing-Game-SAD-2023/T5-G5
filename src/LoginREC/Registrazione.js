import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import './signup.css'; 

function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    courseofstudy:''
  });

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerData = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      courseofstudy: values.courseofstudy
    };

    

    fetch("http://localhost:8080/player/add", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(playerData)
    })
    //.then(response => response.json())
    
    .then(response => response.text())
    .then(data => {
      if (data === 'Email già presente') {
        // If the email already exists, show an error message to the user
        alert('Email già presente. Si prega di utilizzare altra email.');
      }
        else
{      console.log('Player data sent to server:', data);
      // Reindirizza l'utente alla pagina di login dopo la registrazione
      navigate('/');}
    })
    .catch(error => {
      console.error('Error sending player data:', error);
    });
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <Container className="h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <Form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                      <div className="form-floating mb-4">
                        <input type="text" id="name" className="form-control" name="name" value={values.name} onChange={handleInput} required />
                        <label className="form-label" htmlFor="name">Name</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input type="text" id="surname" className="form-control" name="surname" value={values.surname} onChange={handleInput} required />
                        <label className="form-label" htmlFor="surname">Surname</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input type="email" id="email" className="form-control" name="email" value={values.email} onChange={handleInput} required />
                        <label className="form-label" htmlFor="email">Email</label>
                      </div>

                      <div className="form-floating mb-4">
                        <input type="password" id="password" className="form-control" name="password" value={values.password} onChange={handleInput} required />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                      <div className="form-floating mb-4">
                        <select id="courseofstudy" className="form-select" name="courseofstudy" value={values.courseofstudy} onChange={handleInput} required>
                        <option value="">Seleziona un corso di studi</option>
                        <option value="triennale">Triennale</option>
                        <option value="magistrale">Magistrale</option>
                        <option value="altro">Altro</option>
                        </select>
                         <label className="form-label" htmlFor="courseofstudy">Course of study</label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Button type="submit" className="btn btn-primary btn-lg">Register</Button>
                      </div>

                    </Form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Signup;