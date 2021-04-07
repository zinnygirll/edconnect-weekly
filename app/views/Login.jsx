import React, { useState } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import Layout from './shared/Layout';

const Login = (props) => {
 
    return (
        <Layout>
            <main className="mx-auto w-50 p-3">
              <h1>Login</h1>
              <Form id="loginForm" className="w-40 p-3" action="login" method="POST">
                    {props.props.length > 0 && (<Alert variant="danger">{props.props.map((anyAlert) => { return <> {anyAlert} <br/></>})}</Alert>)}
                    <Form.Group as={Row}>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="email" name="email" /> <br /><br />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
              </Form>    
            </main><br/>
        </Layout>
    )
}

export default Login;