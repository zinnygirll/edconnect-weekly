import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, FormControl, FormLabel, Nav, Navbar} from 'react-bootstrap';

const Header = () => {
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
                    document.getElementById("login").style.visibility = "hidden";
                    document.getElementById("signup").style.visibility = "hidden";
                    document.getElementById("logout").style.display = "block";
                    document.getElementById("username").style.display = "block";
                    document.getElementById("username").innerHTML = `<b> Hi ${response.firstname} </b>`;
                })
        }
    }

    // When user clicks the logout link
    function HandleLogout(event) {
        event.preventDefault();
        // Delete cookie
        document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Redirect to home page
        history.push('/')
        document.getElementById("login").style.visibility = "visible";
        document.getElementById("signup").style.visibility = "visible";
        document.getElementById("logout").style.display = "none";
        document.getElementById("username").style.display = "none";
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
                    <Nav.Link href="/signup" id="signup">Sign Up</Nav.Link>
                    <Nav.Link href="/login" id="login">Login</Nav.Link>
                    <Nav.Link href="#" id="logout" onClick={HandleLogout} style={{display: 'none'}}>Logout</Nav.Link>
                    <Navbar.Text id="username" style={{display: 'none'}}></Navbar.Text>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;