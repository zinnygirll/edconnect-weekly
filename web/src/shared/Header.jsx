import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, FormControl, FormLabel, Nav, Navbar} from 'react-bootstrap';

const Header = () => {
    const [username, setUsername] = useState('');
    const [biscuit, setBiscuit] = useState(false);
    let history = useHistory();

    if (document.cookie) {
        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        
        const cookieValue = getCookie("uid");
        let cookieExists = cookieValue ? true : false;
        if (cookieExists) {
            fetch(`/api/users/${cookieValue}`)
                .then(res => res.json())
                .then(function(response) {
                    setUsername(`Hi ${response.firstname}`);
                    setBiscuit(true);
                })
        }
    }

    // When user clicks the logout link
    function HandleLogout(event) {
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
        history.push('/') // Redirect to home page
    }


    return (
        <Navbar bg="primary" expand="lg" variant="dark full">
            <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
            <Navbar.Collapse>
                <Form inline name="searchForm">
                    <FormLabel className="sr-only" for="searchForm">Search Projects:</FormLabel>
                    <FormControl type="text" name="searchForm" placeholder="Search Projects" />
                    <Button variant="outline-light" type="submit">Search</Button>
                </Form>
                <Nav className="mr-auto">
                    <Nav.Link href="/projects/submit">Projects</Nav.Link>
                </Nav>

                <Nav className="ml-auto">
                    {biscuit ? 
                    (<>
                    <Nav.Link href="#" id="logout" onClick={HandleLogout}>Logout</Nav.Link>
                    <Navbar.Text id="username">{username}</Navbar.Text>
                    </>) : (<>
                    <Nav.Link href="/signup" id="signup">Sign Up</Nav.Link>
                    <Nav.Link href="/login" id="login">Login</Nav.Link>
                    </>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;