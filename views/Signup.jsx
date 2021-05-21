import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = ({ props1, props2, props3, user }) => {
 
    return (
        <Layout user={user}>
            <main className="mx-auto w-50 p-3">
            <h1>Signup</h1>
            <Form id="signupForm" action="signup" method="POST"> 
                {props3.length > 0 && (
                  <Alert variant="danger">
                    {props3.map((anyAlert) => { return <> {anyAlert} <br/></>})}
                  </Alert>)}
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label htmlFor="firstName">First Name:</Form.Label>
                        <Form.Control type="text" id="firstname" name="firstName" placeholder="First Name" />
                    </Col>
                    <Col>
                        <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                        <Form.Control type="text" id ="lastname" name="lastName" placeholder="Last Name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label htmlFor="email">Email Address:</Form.Label>
                        <Form.Control type="email" id="email" name="email" placeholder="Your Email Address" />
                    </Col>
                    <Col>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" name="password" placeholder="Your password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label htmlFor="program">Program:</Form.Label>
                        <Form.Control as="select" name="program" id="program">
                            <option>Select Program</option>
                            {props1.map((program) => <option key={program}>{program}</option>)}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label htmlFor="matricNumber">Matric Number:</Form.Label>
                        <Form.Control type="text" id="matricNumber" name="matricNumber" placeholder="16/2020" />
                    </Col>
                    <Col>
                        <Form.Label htmlFor="graduationYear">Graduation Year:</Form.Label>
                        <Form.Control as="select" name="graduationYear" id="graduationYear">
                            <option>Select Graduation Year</option>
                            {props2.map((gradYear) => <option key={gradYear}>{gradYear}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Sign Up</Button>
            </Form> <br/>
            </main>
        </Layout>
    )
}

export default Signup;