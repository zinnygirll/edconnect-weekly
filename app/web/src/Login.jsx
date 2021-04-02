import React, { useState } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Layout from './shared/Layout';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [alertBlock, setAlertBlock] = useState(false);
    let history = useHistory();


    const handleInputChange = event => {
      const {name, value} = event.target
      switch (name) {
          case 'email':
              setEmail(value)
              break;
          case 'password':
              setPassword(value)
              break;
      }
    }

    const handleSubmit = event => {
      event.preventDefault();
      let logInfo = {
          email : email,
          password : password
      }

      const loginAlert = document.getElementById("login-alert");

      fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(logInfo), // All form data
          headers: {
              'Content-Type': 'application/json',
          },
          })
          .then(response => response.json())
          .then ((response) => {
              if (response.status === "ok") {
                  document.cookie = `uid=${response.data.id}; domain=; path=/ `; // I am to store the id in a cookie named uid.
                  history.push("/"); // redirect user to home page
              } else if (response.status !== "ok") {
                    setAlertBlock(true);
                    setAlerts("Invalid email/password"); // Supposed to print error message.
              }
          })
    }


    return (
        <Layout>
            <main className="mx-auto w-50 p-3">
              <h1>Login</h1>
              <Form id="loginForm" className="w-40 p-3" onSubmit={handleSubmit}>
                {alertBlock && (<Alert variant="danger">{alerts}</Alert>)}
                    <Form.Group as={Row}>
                      <Form.Label>Email Address:</Form.Label>
                      <Form.Control type="email" 
                        name="email"
                        value={email}
                        onChange={handleInputChange} /> <br /><br />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" 
                            name="password"
                            value={password}
                            onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
              </Form>    
            </main><br/>
        </Layout>
    )
}

export default Login;