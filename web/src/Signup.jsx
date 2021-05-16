import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import Layout from './shared/Layout'

const Signup = (props) => {
    const [programs, setPrograms] = useState([]);
    const [gradYears, setGradYears] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matricNumber, setMatricNmber] = useState('');
    const [programName, setProgramName] = useState('');
    const [graduateYear, setGraduateYear] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [alertBlock, setAlertBlock] = useState(false);
    let history = useHistory();

    useEffect(() => {
        // Get all getables
        fetch("/api/programs")
          .then(res => res.json())
          .then(
            (result) => {
              setPrograms(result);
            }
          )

        fetch("/api/graduationYears")
          .then(res => res.json())
          .then(
            (result) => {
              setGradYears(result);
            }
          )
      }, [])

    // Post all postables
    // Add event listener when the button is clicked.
    const handleInputChange = event => {
        const {name, value} = event.target
        switch (name) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value)
                break;
            case 'matricNumber':
                setMatricNmber(value)
                break;
            case 'program':
                setProgramName(value)
                break;
            case 'graduationYear':
                setGraduateYear(value)
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        let regInfo = {
            firstname :  firstName,
            lastname : lastName,
            email : email,
            password : password,
            matricNumber : matricNumber,
            program : programName,
            graduationYear : graduateYear,
        }

        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(regInfo), // All form data
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then ((response) => {
                if (response.status === "ok") {
                    document.cookie = `uid=${response.data.id}; path=/ `; // I am to store the id in a cookie named uid.
                    history.push("/"); // redirect user to home page
                } else if (response.status !== "ok") {
                    setAlertBlock(true);
                    setAlerts(response.errors); // Supposed to print error message.
                }
            })
    }
    
    return (
        <Layout>
            <main className="mx-auto w-50 p-3">
            <h1>Signup</h1>
            <Form id="signupForm" onSubmit={handleSubmit}> 
                {alertBlock && (
                  <Alert variant="danger">
                    {alerts.map((anyAlert) => { return <> {anyAlert} <br/></>})}
                  </Alert>)}
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label for="firstName">First Name:</Form.Label>
                        <Form.Control type="text" 
                            id="firstname" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Label for="lastName">Last Name:</Form.Label>
                        <Form.Control type="text" 
                            id ="lastname" 
                            name="lastName" 
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleInputChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label for="email">Email Address:</Form.Label>
                        <Form.Control type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your Email Address"
                            value={email}
                            onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Label for="password">Password:</Form.Label>
                        <Form.Control type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Your password"
                            value={password}
                            onChange={handleInputChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label for="program">Program:</Form.Label>
                        <Form.Control as="select" 
                            name="program" 
                            id="program"
                            value={programName}
                            onChange={handleInputChange}>
                            <option>Select Program</option>
                            {programs.map((program) => <option key={program}>{program}</option>)}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label for="matricNumber">Matric Number:</Form.Label>
                        <Form.Control type="text" 
                            id="matricNumber" 
                            name="matricNumber" 
                            placeholder="16/2020"
                            value={matricNumber}
                            onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Label for="graduationYear">Graduation Year:</Form.Label>
                        <Form.Control as="select" 
                            name="graduationYear" 
                            id="graduationYear"
                            value={graduateYear}
                            onChange={handleInputChange}>
                            <option>Select Graduation Year</option>
                            {gradYears.map((gradYear) => <option key={gradYear}>{gradYear}</option>)}
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